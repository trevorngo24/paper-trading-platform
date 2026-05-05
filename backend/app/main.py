from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from app.database import Base, engine
from app import models
from app.session import session_local
from app.auth import hash_password, verify_password, create_access_token, get_current_user
from app.models import User, Portfolio, Trade, Holding
from app.schemas import UserCreate, UserLogin, TradeCreate
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine) # create the table if table doesnt exist 

app = FastAPI(title="Paper Trading Platform API")
app.add_middleware(

    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],

)


def get_stock_price(symbol: str):
    return 100.0

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
def buy_stock(trade_data: TradeCreate, current_user: User = Depends(get_current_user)):
    db = session_local()
    try:
        portfolio = db.query(Portfolio).filter(Portfolio.user_id == current_user.id).first()
        
        if not portfolio:
            raise HTTPException(status_code=404, detail="Portfolio not found")
        if trade_data.quantity <= 0:
            raise HTTPException(status_code=400, detail="Quantity must be greater than 0")
        
        price = 100.0 # this is just an placeholder price, later we will change this using an external API to get real stock prices
        total_cost = price * trade_data.quantity

        if portfolio.cash_balance < total_cost:
            raise HTTPException(status_code=400, detail="Insufficient Funds")
        
        portfolio.cash_balance -= total_cost

        # Check if the user already owns this stock, if yes add more shares, if no create a new holding
        holding = db.query(Holding).filter( # look inside the holdings table 
            Holding.user_id == current_user.id, # find these rows
            Holding.symbol == trade_data.symbol.upper()
        ).first() # retrieve the existing holding if it exists, or None of nothing exists

        if holding:
            holding.quantity += trade_data.quantity
        else:
            holding = Holding(
                user_id=current_user.id,
                symbol=trade_data.symbol.upper(),
                quantity=trade_data.quantity
            )
            db.add(holding)

        new_trade = Trade( # we create an row to store this into the Trade table
            user_id=current_user.id,
            symbol= trade_data.symbol.upper(),
            quantity= trade_data.quantity,
            price=price,
            trade_type="buy"
        )
        db.add(new_trade)
        db.commit()

        return {
            "message": "Stock purchased",
            "symbol": trade_data.symbol.upper(),
            "quantity": trade_data.quantity,
            "price": price,
            "total_cost": total_cost,
            "remaining_balance": portfolio.cash_balance
        }
    finally:
        db.close()

# Finds all holdings for the logged-in user
@app.get("/holdings") # creates an get route called holdings
def get_holdings(current_user: User = Depends(get_current_user)): # depends get_current_user checks the JWT token and gives us the logged-in user
    db = session_local() # opens the db session so we can query the db
    try: # starts an safe block so we can close the db no matter what happens
        holdings = db.query(Holding).filter( # look inside the holdings table and get all holdings associated with user_id
            Holding.user_id == current_user.id
        ).all()

        return [ # for each holding, return the stock symbol and quantity
            {
                "symbol": h.symbol,
                "quantity": h.quantity
            }
            for h in holdings # loops through every holding found in the db
        ]
    finally:
        db.close()

@app.post("/trade/sell")
def sell_stock(trade_data: TradeCreate, current_user: User = Depends(get_current_user)):
    db = session_local()
    try:
        portfolio = db.query(Portfolio).filter(Portfolio.user_id == current_user.id).first()

        if not portfolio:
            raise HTTPException(status_code=404, detail="Portfolio not found")
        
        if trade_data.quantity <= 0:
            raise HTTPException(status_code=400, detail="Quantity must be greater than 0")
        
        symbol = trade_data.symbol.upper()
        price = 100.0
        total_value = price * trade_data.quantity

        holding = db.query(Holding).filter(
            Holding.user_id == current_user.id,
            Holding.symbol == symbol
        ).first() 
        
        if not holding:
            raise HTTPException(status_code=404, detail="You do not own this stock")
        
        if holding.quantity < trade_data.quantity:
            raise HTTPException(status_code=400, detail="Not enough shares to sell")
        
        holding.quantity -= trade_data.quantity
        portfolio.cash_balance += total_value

        if holding.quantity == 0:
            db.delete(holding)
        
        new_trade = Trade(
            user_id = current_user.id,
            symbol=symbol,
            quantity= trade_data.quantity,
            price=price,
            trade_type="sell"

        )
        db.add(new_trade)
        db.commit()

        return {
            "message": "Stock sold",
            "symbol": symbol,
            "quantity": new_trade.quantity,
            "price": price,
            "total_value": total_value,
            "new_balance": portfolio.cash_balance

        }
    finally:
        db.close()

@app.get("/trades")
def get_trades(current_user: User = Depends(get_current_user)):
    db = session_local()
    try:
        trades = db.query(Trade).filter(Trade.user_id == current_user.id).all()

        return [
            {
                "symbol": t.symbol,
                "quantity": t.quantity,
                "price": t.price,
                "trade_type": t.trade_type

            }
            for t in trades
        ]
    finally:
        db.close()

        

        




    





    


    

    

