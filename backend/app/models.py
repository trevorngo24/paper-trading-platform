from sqlalchemy.orm import Mapped, mapped_column, sessionmaker, declarative_base
from .database import Base

class User(Base): # creates an database called users
    __tablename__ = "users" 
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(unique = True) # we are creating col in the db
    email: Mapped[str] = mapped_column(unique = True)
    hashed_password: Mapped[str]

    def __repr__(self) -> str:
        return f"<User(id={self.id}, username = {self.username}, email = {self.email})>"
