from sqlalchemy.orm import Mapped, mapped_column, sessionmaker, declarative_base, relationship
from .database import Base
from sqlalchemy import ForeignKey

class User(Base): # creates an database called users
    __tablename__ = "users" 
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(unique = True) # we are creating col in the db
    email: Mapped[str] = mapped_column(unique = True)
    hashed_password: Mapped[str]

    portfolio: Mapped["Portfolio"] = relationship(back_populates="user", uselist=False) # user to portfolio

    def __repr__(self) -> str:
        return f"<User(id={self.id}, username = {self.username}, email = {self.email})>"
    
class Portfolio(Base): # create table named portfolios
        __tablename__ = "portfolios"

        id: Mapped[int] = mapped_column(primary_key=True) 
        user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), unique=True) # forgein key, every portfolio belongs to an user
        cash_balance: Mapped[float] = mapped_column(default=10000.0) # everyone will start with an $10,000 balance

        user: Mapped["User"] = relationship(back_populates="portfolio") # creates the bridge from porfolio to user

        def __repr__(self) -> str:
            return f"<Portfolio(id={self.id}, user_id={self.user_id}, cash_balance={self.cash_balance})>"

class Trade(Base):
     __tablename__ = "trades"

     id: Mapped[int] = mapped_column(primary_key=True)
     user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
     symbol: Mapped[str] # stock name such as tsla, aapl
     quantity: Mapped[int] # how many shares u want to buy
     price: Mapped[float]
     trade_type: Mapped[str] # bought or sold

     def __repr__(self) -> str:
          return f"<Trade(id={self.id}, user_id={self.user_id}, symbol={self.symbol}, quantity={self.quantity}, price={self.price}, trade_type={self.trade_type})>"

class Holding(Base):
     __tablename__ = "holdings"

     id: Mapped[int] = mapped_column(primary_key=True)
     user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
     symbol: Mapped[str]
     quantity: Mapped[int]

     def __repr__(self) -> str:
          return f"<Holding>(id={self.id}, user_id={self.user_id}, symbol={self.symbol}, quantity={self.quantity})>"
