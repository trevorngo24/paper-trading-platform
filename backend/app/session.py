from sqlalchemy.orm import sessionmaker
from app.database import engine

# Create a session factory (class) that makes DB sessions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Convenience function so your main.py can call session_local()
def session_local():
    return SessionLocal()