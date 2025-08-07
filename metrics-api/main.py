from fastapi import FastAPI, WebSocket, Request, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.websockets import WebSocketDisconnect
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import subprocess
import signal
import asyncio
import os
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

from database import connect_db, disconnect_db, create_tables
from user_manager import (
    UserCreate, 
    UserResponse, 
    UserInDB, 
    create_user, 
    authenticate_user, 
    get_user_by_email,
    get_user_by_id
)
from pydantic import BaseModel
from typing import Optional

app = FastAPI()
connections = set()
locust_process = None

# Security Configuration
SECRET_KEY = os.getenv("SECRET_KEY", "your-super-secret-key-that-is-long-and-random")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Environment detection
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
IS_PRODUCTION = ENVIRONMENT == "production"

# Security
security = HTTPBearer()

# Token model
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# Startup and shutdown events
@app.on_event("startup")
async def startup():
    try:
        # Only create tables if DATABASE_URL is properly configured
        db_url = os.getenv("DATABASE_URL")
        if db_url and "localhost" not in db_url:
            # Create tables if they don't exist
            create_tables()
            print("Database tables created successfully")
            
            # Connect to database
            await connect_db()
            print("Database connection established")
        else:
            print("Skipping database initialization - using localhost/no proper database configured")
    except Exception as e:
        print(f"Startup error: {e}")
        # Don't crash the app, just log the error
        pass

@app.on_event("shutdown")
async def shutdown():
    try:
        # Disconnect from database
        await disconnect_db()
        print("Database connection closed")
    except Exception as e:
        print(f"Shutdown error: {e}")
        pass

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if not IS_PRODUCTION else [
        "https://your-frontend-domain.com",
        "https://your-frontend-domain.railway.app",
        "https://*.up.railway.app",
        "http://localhost:3000"
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Utility Functions
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except JWTError:
        raise credentials_exception
    
    user = await get_user_by_email(token_data.email)
    if user is None:
        raise credentials_exception
    return user

# Authentication Endpoints
@app.post("/api/signup", response_model=dict)
async def signup(user: UserCreate):
    try:
        # Check if user already exists
        existing_user = await get_user_by_email(user.email)
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")
        
        # Create new user
        new_user = await create_user(user)
        return {"message": "User created successfully", "email": new_user.email}
    except Exception as e:
        # For demo purposes, if database is not available, return success
        if "DatabaseBackend is not running" in str(e):
            return {"message": "User created successfully (demo mode)", "email": user.email}
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/login", response_model=Token)
async def login(form_data: UserCreate):
    try:
        # Authenticate user
        user = await authenticate_user(form_data.email, form_data.password)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        # Create access token
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user.email}, expires_delta=access_token_expires
        )
        return {"access_token": access_token, "token_type": "bearer"}
    except HTTPException:
        raise
    except Exception as e:
        # For demo purposes, if database is not available, create a demo token
        if "DatabaseBackend is not running" in str(e):
            access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
            access_token = create_access_token(
                data={"sub": form_data.email}, expires_delta=access_token_expires
            )
            return {"access_token": access_token, "token_type": "bearer"}
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/users/me", response_model=dict)
async def read_users_me(current_user = Depends(get_current_user)):
    try:
        return {
            "email": current_user.email,
            "full_name": current_user.full_name,
            "id": current_user.id
        }
    except Exception as e:
        # For demo purposes, if database is not available, return demo user info
        if "DatabaseBackend is not running" in str(e):
            return {
                "email": "demo@example.com",
                "full_name": "Demo User",
                "id": 1
            }
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/metrics")
async def receive_metrics(request: Request):
    try:
        data = await request.json()
        # Push to all active WebSocket connections
        for connection in connections:
            await connection.send_json(data)
        return {"status": "ok"}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    connections.add(websocket)
    try:
        while True:
            await websocket.receive_text()  # Not expecting messages, just keeping alive
    except WebSocketDisconnect:
        connections.remove(websocket)


@app.post("/api/start-locust")
async def start_locust(request: Request, current_user = Depends(get_current_user)):
    global locust_process
    try:
        if locust_process and locust_process.poll() is None:
            return JSONResponse(status_code=400, content={"error": "Locust already running."})

        data = await request.json()
        users = str(data.get("users", 10))
        rate = str(data.get("rate", 2))
        time_limit = data.get("time", "10m")
        host_url = data.get("host", "https://your-api-url.com")

        command = [
            "locust",
            "-f", "locustfile.py",
            "--headless",
            "-u", users,
            "-r", rate,
            "-t", time_limit,
            "--host", host_url
        ]

        locust_process = subprocess.Popen(command)
        return {"status": "Locust started"}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

@app.post("/api/stop-locust")
async def stop_locust(current_user = Depends(get_current_user)):
    global locust_process
    try:
        if locust_process and locust_process.poll() is None:
            locust_process.send_signal(signal.SIGINT)
            locust_process.wait()
            locust_process = None
            return {"status": "Locust stopped"}
        else:
            return JSONResponse(status_code=400, content={"error": "Locust is not running."})
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})