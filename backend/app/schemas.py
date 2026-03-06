from pydantic import BaseModel # pydantic validates all inputed data 

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str