from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone
import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jwt.exceptions import InvalidTokenError
from sqlalchemy.orm import Session

from .database import get_db
from .models import User

SECRET_KEY = "qwertyuiop12wu3pj7fhgf8j9401cdh74gfh5fd28"
ALGORITHM = "HS256"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto") # used to password hashing and unhashing

def hash_password(password: str) -> str:
    return pwd_context.hash(password) # turn a plain pw to a secure hashed pw 

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password) # check if the login password matches the stored hash

# Function to create a JWT token when the user logs in / essentially we are creating an token that contains the user(sub) and its expiration
def create_access_token(data:dict, expires_delta: timedelta | None = None) -> str: 
    to_encode = data.copy() # copy the data dic so we don't modify the orginal, data = sub: trevor
    expire = datetime.now(timezone.utc) + ( # create expiration date for the token for user safety 
        expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES )
    )
    to_encode.update({"exp": expire}) #exp: 2026-03-19 19:30
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def authenticate_user(db: Session, email:str, password: str):
    user = get_user_by_email(db, email)

    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    
    return user

# Checks the JWT Token and returns the logged-in user, checking if a request is coming from logged in user
def get_current_user(
        token: str = Depends(oauth2_scheme), # fastapi gets the token from auth header
        db: Session = Depends(get_db) # database session dependency, gives access to db
): # flow: login -> token gen -> protected route req -> decode token  -> extracts user id (sub) -> checks db for user -> return authenticated user
    
      # If anything goes wrong we throw this error
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",

        # This tells the client authentication failed
        headers={"WWW-Authenticate": "Bearer"},
    )


    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM]) # Decode the JWT token using the secret key
        user_id = payload.get("sub") # Extract the "sub" field from the token payload
        
        if user_id is None:# If the token does not contain a user id, reject it
            raise credentials_exception
        user = db.query(User).filter(User.id == int(user_id)).first()
        if user is None: # If the user no longer exists, reject token
            raise credentials_exception
        return user
    
    except (InvalidTokenError, ValueError): # If the token is invalid or malformed
        raise credentials_exception  # Raise the authentication error
    
    