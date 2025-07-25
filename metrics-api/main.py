from fastapi import FastAPI, WebSocket, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.websockets import WebSocketDisconnect
import subprocess
import signal
import asyncio

app = FastAPI()
connections = set()

locust_process = None

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


@app.post("/start-locust")
async def start_locust(request: Request):
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

@app.post("/stop-locust")
async def stop_locust():
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