from sqlalchemy.orm import Session
from sqlalchemy import select
from passlib.context import CryptContext
from database import User, database
from pydantic import BaseModel, EmailStr
from typing import Optional

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Pydantic models
class UserCreate(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
    full_name: Optional[str] = None
    created_at: str
    
    class Config:
        from_attributes = True

class UserInDB(BaseModel):
    id: int
    email: str
    full_name: Optional[str] = None
    hashed_password: str

# Password utilities
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

# Database operations
async def create_user(user: UserCreate) -> Optional[UserResponse]:
    hashed_password = get_password_hash(user.password)
    
    query = """
    INSERT INTO users (email, full_name, hashed_password, created_at, updated_at) 
    VALUES (:email, :full_name, :hashed_password, NOW(), NOW())
    """
    
    try:
        result = await database.execute(
            query=query, 
            values={
                "email": user.email,
                "full_name": user.full_name,
                "hashed_password": hashed_password
            }
        )
        
        # Get the created user
        user_query = "SELECT id, email, full_name, created_at FROM users WHERE id = :user_id"
        user_record = await database.fetch_one(
            query=user_query, 
            values={"user_id": result}
        )
        
        if user_record:
            return UserResponse(
                id=user_record["id"],
                email=user_record["email"],
                full_name=user_record["full_name"],
                created_at=str(user_record["created_at"])
            )
    except Exception as e:
        print(f"Error creating user: {e}")
        return None

async def get_user_by_email(email: str) -> Optional[UserInDB]:
    query = "SELECT id, email, full_name, hashed_password FROM users WHERE email = :email"
    
    try:
        user_record = await database.fetch_one(query=query, values={"email": email})
        
        if user_record:
            return UserInDB(
                id=user_record["id"],
                email=user_record["email"],
                full_name=user_record["full_name"],
                hashed_password=user_record["hashed_password"]
            )
    except Exception as e:
        print(f"Error getting user: {e}")
        return None

async def authenticate_user(email: str, password: str) -> Optional[UserInDB]:
    user = await get_user_by_email(email)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user

async def get_user_by_id(user_id: int) -> Optional[UserResponse]:
    query = "SELECT id, email, full_name, created_at FROM users WHERE id = :user_id"
    
    try:
        user_record = await database.fetch_one(query=query, values={"user_id": user_id})
        
        if user_record:
            return UserResponse(
                id=user_record["id"],
                email=user_record["email"],
                full_name=user_record["full_name"],
                created_at=str(user_record["created_at"])
            )
    except Exception as e:
        print(f"Error getting user by ID: {e}")
        return None
