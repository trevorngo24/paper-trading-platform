import re
import requests
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from app.database import Base, engine
from app.session import session_local
from app.auth import hash_password, verify_password, create_access_token, get_current_user
from app.models import User, Portfolio, Trade, Holding
from app.schemas import UserCreate, TradeCreate
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Paper Trading Platform API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

FINNHUB_KEY = "d7t8u1hr01qugn09q5tgd7t8u1hr01qugn09q5u0"


def get_stock_price(symbol: str):
    url = f"https://finnhub.io/api/v1/quote?symbol={symbol.upper()}&token={FINNHUB_KEY}"
    response = requests.get(url)
    data = response.json()

    if "c" not in data or data["c"] == 0:
        raise HTTPException(
            status_code=400, detail="Invalid stock symbol or price unavailable")

    return float(data["c"])


@app.post("/register")
def register(user: UserCreate):
    db = session_local()
    try:
        if len(user.password) < 10:
            raise HTTPException(
                status_code=400, detail="Password must be at least 10 characters")
        if not re.search(r"[A-Z]", user.password):
            raise HTTPException(
                status_code=400, detail="Password must contain at least one uppercase letter")
        if not re.search(r"[0-9]", user.password):
            raise HTTPException(
                status_code=400, detail="Password must contain at least one number")
        if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", user.password):
            raise HTTPException(
                status_code=400, detail="Password must contain at least one special character")

        existing_user = db.query(User).filter(
            User.username == user.username).first()
        if existing_user:
            raise HTTPException(
                status_code=400, detail="Username already exists")

        existing_email = db.query(User).filter(
            User.email == user.email).first()
        if existing_email:
            raise HTTPException(status_code=400, detail="Email already exists")

        hashed_pw = hash_password(user.password)

        new_user = User(
            username=user.username,
            email=user.email,
            hashed_password=hashed_pw,
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        portfolio = Portfolio(user_id=new_user.id, cash_balance=10000.0)

        db.add(portfolio)
        db.commit()
        db.refresh(portfolio)

        return {
            "message": "User created",
            "username": new_user.username,
            "email": new_user.email,
            "portfolio_id": portfolio.id,
            "cash_balance": portfolio.cash_balance,
        }
    finally:
        db.close()


@app.post("/login")
def login(user: OAuth2PasswordRequestForm = Depends()):
    db = session_local()
    try:
        db_user = db.query(User).filter(User.username == user.username).first()

        if not db_user:
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
def read_current_user(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "username": current_user.username,
        "email": current_user.email,
    }


@app.get("/portfolio")
def get_portfolio(current_user: User = Depends(get_current_user)):
    db = session_local()
    try:
        portfolio = db.query(Portfolio).filter(
            Portfolio.user_id == current_user.id).first()

        if not portfolio:
            raise HTTPException(status_code=404, detail="Portfolio not found")

        return {
            "user_id": current_user.id,
            "username": current_user.username,
            "cash_balance": portfolio.cash_balance,
        }
    finally:
        db.close()


@app.post("/trade/buy")
def buy_stock(trade_data: TradeCreate, current_user: User = Depends(get_current_user)):
    db = session_local()
    try:
        portfolio = db.query(Portfolio).filter(
            Portfolio.user_id == current_user.id).first()

        if not portfolio:
            raise HTTPException(status_code=404, detail="Portfolio not found")

        if trade_data.quantity <= 0:
            raise HTTPException(
                status_code=400, detail="Quantity must be greater than 0")

        price = get_stock_price(trade_data.symbol)
        total_cost = price * trade_data.quantity

        if portfolio.cash_balance < total_cost:
            raise HTTPException(status_code=400, detail="Insufficient Funds")

        portfolio.cash_balance -= total_cost

        holding = db.query(Holding).filter(
            Holding.user_id == current_user.id,
            Holding.symbol == trade_data.symbol.upper()
        ).first()

        if holding:
            holding.quantity += trade_data.quantity
        else:
            holding = Holding(
                user_id=current_user.id,
                symbol=trade_data.symbol.upper(),
                quantity=trade_data.quantity,
            )
            db.add(holding)

        new_trade = Trade(
            user_id=current_user.id,
            symbol=trade_data.symbol.upper(),
            quantity=trade_data.quantity,
            price=price,
            trade_type="buy",
        )

        db.add(new_trade)
        db.commit()

        return {
            "message": "Stock purchased",
            "symbol": trade_data.symbol.upper(),
            "quantity": trade_data.quantity,
            "price": price,
            "total_cost": total_cost,
            "remaining_balance": portfolio.cash_balance,
        }
    finally:
        db.close()


@app.get("/holdings")
def get_holdings(current_user: User = Depends(get_current_user)):
    db = session_local()
    try:
        holdings = db.query(Holding).filter(
            Holding.user_id == current_user.id).all()

        return [
            {
                "symbol": h.symbol,
                "quantity": h.quantity,
            }
            for h in holdings
        ]
    finally:
        db.close()


@app.post("/trade/sell")
def sell_stock(trade_data: TradeCreate, current_user: User = Depends(get_current_user)):
    db = session_local()
    try:
        portfolio = db.query(Portfolio).filter(
            Portfolio.user_id == current_user.id).first()

        if not portfolio:
            raise HTTPException(status_code=404, detail="Portfolio not found")

        if trade_data.quantity <= 0:
            raise HTTPException(
                status_code=400, detail="Quantity must be greater than 0")

        symbol = trade_data.symbol.upper()
        price = get_stock_price(symbol)
        total_value = price * trade_data.quantity

        holding = db.query(Holding).filter(
            Holding.user_id == current_user.id,
            Holding.symbol == symbol
        ).first()

        if not holding:
            raise HTTPException(
                status_code=404, detail="You do not own this stock")

        if holding.quantity < trade_data.quantity:
            raise HTTPException(
                status_code=400, detail="Not enough shares to sell")

        holding.quantity -= trade_data.quantity
        portfolio.cash_balance += total_value

        if holding.quantity == 0:
            db.delete(holding)

        new_trade = Trade(
            user_id=current_user.id,
            symbol=symbol,
            quantity=trade_data.quantity,
            price=price,
            trade_type="sell",
        )

        db.add(new_trade)
        db.commit()

        return {
            "message": "Stock sold",
            "symbol": symbol,
            "quantity": new_trade.quantity,
            "price": price,
            "total_value": total_value,
            "new_balance": portfolio.cash_balance,
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
                "trade_type": t.trade_type,
            }
            for t in trades
        ]
    finally:
        db.close()
