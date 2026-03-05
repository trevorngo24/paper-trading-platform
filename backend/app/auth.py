from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto") # used to password hashing and unhashing

def hash_password(password: str) -> str:
    return pwd_context.hash(password) # turn a plain pw to a secure hashed pw 

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password) # check if the login password matches the stored hash 