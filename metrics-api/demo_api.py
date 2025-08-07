# Simple demo endpoints that work without database
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime, timedelta
from jose import jwt
import os

# Create a separate demo app
demo_app = FastAPI()

# Add CORS
demo_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class UserCreate(BaseModel):
    email: str
    password: str
    full_name: str = None

class Token(BaseModel):
    access_token: str
    token_type: str

# Demo secret key
SECRET_KEY = "demo-secret-key-for-testing"
ALGORITHM = "HS256"

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@demo_app.post("/api/signup", response_model=dict)
async def signup(user: UserCreate):
    return {"message": "User created successfully (demo mode)", "email": user.email}

@demo_app.post("/api/login", response_model=Token)
async def login(form_data: UserCreate):
    # Create demo token
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": form_data.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@demo_app.get("/api/users/me", response_model=dict)
async def read_users_me():
    return {
        "email": "demo@example.com",
        "full_name": "Demo User",
        "id": 1
    }

@demo_app.get("/")
async def root():
    return {"message": "Demo API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(demo_app, host="0.0.0.0", port=8001)
