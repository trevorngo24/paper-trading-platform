import sqlalchemy as sa
from sqlalchemy.orm import Mapped, mapped_column, sessionmaker, declarative_base

db = "sqlite:///tradesim.db" # we still need to create the db engine 
engine = sa.create_engine(db, echo=True) # creates the bridge between python(sa) and db
session_local = sessionmaker(bind=engine) # allows us to run queries on this engine
Base = declarative_base() # Anything that inherits from Base will be treated as a database table.
