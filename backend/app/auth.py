from passlib.context import CryptContext

bycrypt_context = CryptContext(schemes=['bycrypt'], deprecated= 'auto') # used to  password hashing and unhashing

def hash_password(password: str) -> str:
    return bycrypt_context.hash(password) # turn a plain pw to a secure hashed pw 

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bycrypt_context.verify(plain_password, hash_password) # check if the login password matches the stored hash 