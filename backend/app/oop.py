import sqlalchemy as sa
from sqlalchemy.orm import Mapped, mapped_column, sessionmaker, declarative_base

db = sa.create_engine("sqlite:///tradesim.db") # we still need to create the db engine 
Session = sessionmaker(bind = db) # its saying that this database needs to be binded on this session 
Base = declarative_base() # Anything that inherits from Base will be treated as a database table.

class User(Base): # creates an database called users
    __tablename__ = "users" 
    username: Mapped[str] = mapped_column(primary_key=True, unique = True) # we are creating col in the db
    email: Mapped[str]
    password: Mapped[str]

    def __repr__(self) -> str:
        return f"<User(username = {self.username}, email = {self.email})>"
    
def main() -> None:
    Base.metadata.create_all(db)
    user = User(username = "trevorngo14", email = "trevorngo14@gmail.com")

    with Session() as session: # use an session class to have an session
        session.add(user) # we add the user in the db
        session.commit() # we commit the action
        print(session.query(User).all())

if __name__ == "__main__":
    main()