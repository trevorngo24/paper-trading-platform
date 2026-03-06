from fastapi import FastAPI
from app.database import Base, engine
from app import models
from app.session import session_local
from app.auth import hash_password, verify_password
from app.models import User
from app.schemas import UserCreate, UserLogin

Base.metadata.create_all(bind=engine) # create the table if table doesnt exist 

app = FastAPI(title="Paper Trading Platform API")


@app.post("/register")
def register(user: UserCreate):
    db = session_local() # we want to run the session in order to makes changes
    try:
        hashed_pw = hash_password(user.password) # hash the plain text pw 
        newUser = User( # we create an database row and fill it in using user input info
            username=user.username,
            email=user.email,
            hashed_password=hashed_pw,
        )
        db.add(newUser) # add new user to db
        db.commit() # commit it to the db
        return {"message": "User created", "username": user.username} # return this text 
    finally:
        db.close()

@app.post("/login")
def login(user: UserLogin):
    db = session_local()
    try:
        user = db.query(User).filter(User.username == user.username).first() # go inside the db and look the user table and find the row where the username matches the input username and give me the first match
        if not user: # if not in there return error message
            return{"error": "User Not Found"}
        if not verify_password(user.password, user.hashed_password): 
            return{"error": "Invalid Password"}
        return {"message": "Login Sucessful", "username": user.username}
    
    finally:
        db.close()

    


    

    

