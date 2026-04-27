from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from app.database import Base, engine
from app import models
from app.session import session_local
from app.auth import hash_password, verify_password, create_access_token, get_current_user
from app.models import User, Portfolio, Trade
from app.schemas import UserCreate, UserLogin

Base.metadata.create_all(bind=engine) # create the table if table doesnt exist 

app = FastAPI(title="Paper Trading Platform API")


@app.post("/register")
def register(user: UserCreate):
    db = session_local() # we want to run the session in order to makes changes
    try:
        existing_user = db.query(User).filter(User.username == user.username).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Username already exists")
        existing_email = db.query(User).filter(User.email == user.email).first()
        if existing_email:
            raise HTTPException(status_code=400, detail="Email already exists")

        hashed_pw = hash_password(user.password) # hash the plain text pw 
        newUser = User( # we create an database row and fill it in using user input info
            username=user.username,
            email=user.email,
            hashed_password=hashed_pw,
        )
        db.add(newUser) # add new user to db
        db.commit() # commit it to the db
        db.refresh(newUser)

        portfolio = Portfolio( # when a user registers, we create a portfolio row them using their user_id and give them a balance of 10,000
            user_id=newUser.id,
            cash_balance=10000.0
        )
        db.add(portfolio)
        db.commit()
        return {
            "message": "User created",
            "username": newUser.username,
            "email": newUser.email,
            "portfolio_id": portfolio.id,
            "cash_balance": portfolio.cash_balance,
        }
    finally:
        db.close()

@app.post("/login")
def login(user: OAuth2PasswordRequestForm = Depends()):
    db = session_local()
    try:
        db_user = db.query(User).filter(User.username == user.username).first() # go inside the db and look the user table and find the row where the username matches the input username and give me the first match
        if not db_user: # if not in there return error message
            raise HTTPException(status_code=404, detail="User not found")

        if not verify_password(user.password, db_user.hashed_password): 
            raise HTTPException(status_code=401, detail="Invalid password")
        access_token = create_access_token(data={"sub": str(db_user.id)})
        return {
            "message": "Login successful",
            "access_token": access_token,
            "token_type": "bearer",
        }    
    finally:
        db.close()

@app.get("/me")
def read_current_user(current_user: User = Depends(get_current_user)): # get_current_user from auth.py
    return {
        "id": current_user.id,
        "username": current_user.username,
        "email": current_user.email,

    }

@app.get("/portfolio")
def get_portfolio(current_user: User = Depends(get_current_user)):
    db = session_local() # we want to run the session in order to makes changes
    try:
        portfolio = db.query(Portfolio).filter(Portfolio.user_id == current_user.id).first() # find the portfolio associated to the user
        
        if not portfolio:
            raise HTTPException(status_code=404, detail="Portfolio not found")
        return {
            "user_id": current_user.id,
            "username": current_user.username,
            "cash_balance": portfolio.cash_balance
        }
    finally:
        db.close()

@app.post("/trade/buy") # post bc the user is sending data to the serber to create a trade, and that trade is stored in the db
def buy_stock(symbol: str, quantity: int, current_user: User = Depends(get_current_user)):
    db = session_local()
    try:
        portfolio = db.query(Portfolio).filter(Portfolio.user_id == current_user.id).first()
        
        if not portfolio:
            raise HTTPException(status_code=404, detail="Portfolio not found")
        if quantity <= 0:
            raise HTTPException(status_code=400, detail="Quantity must be greater than 0")
        
        price = 100.0 # this is just an placeholder price, later we will change this using an external API to get real stock prices
        total_cost = price * quantity

        if portfolio.cash_balance < total_cost:
            raise HTTPException(status_code=400, detail="Insufficient Funds")
        
        portfolio.cash_balance -= total_cost

        trade = Trade( # we create an row to store this into the Trade table
            user_id=current_user.id,
            symbol=symbol.upper(),
            quantity=quantity,
            price=price,
            trade_type="buy"
        )
        db.add(trade)
        db.commit()

        return {
            "message": "Stock purchased",
            "symbol": symbol.upper(),
            "quantity": quantity,
            "price": price,
            "total_cost": total_cost,
            "remaining_balance": portfolio.cash_balance
        }
    finally:
        db.close()
    





    


    

    

