from fastapi import FastAPI, WebSocket, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.websockets import WebSocketDisconnect

import asyncio

app = FastAPI()
connections = set()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Use actual domain in production
    allow_methods=["*"],
    allow_headers=["*"],
)

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
