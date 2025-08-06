#!/usr/bin/env python3

import uvicorn
from main import app

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        reload_dirs=["/workspaces/locust-dashboard-railway/metrics-api"]
    )
