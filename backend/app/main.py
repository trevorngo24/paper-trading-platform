from fastapi import FastAPI
from app.database import Base, engine
Base.metadata.create_all(bind=engine)
from app.database import session_local
from app.auth import hash_password
from app.models import User 
from app.auth import verify_password

app = FastAPI(title="Paper Trading Platform API")

@app.post("/register")
def register(username: str, email: str, password: str):
    db = session_local()
    try:
        hashed_pw = hash_password(password)
        newUser = User(
            username=username,
            email=email,
            hashed_password=hashed_pw,
        )
        db.add(newUser)
        db.commit()
        return {"message": "User created", "username": username}
    finally:
        db.close()

@app.post("/login")
def login(username: str, password:str):
    db = session_local
    try:
        user = db.query(User).filter(User.username == username).first()
        if not user:
            return{"error": "User Not Found"}
        if not verify_password(password, user.hashed_password):
            return{"error": "Invalid Password"}
        return {"message": "Login Sucessful", "username": user.username}
    
    finally:
        db.close()

    


    

    

