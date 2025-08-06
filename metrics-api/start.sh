#!/bin/bash

# Wait for database to be ready
echo "Waiting for database to be ready..."

# Install dependencies if not already installed
pip install -r requirements.txt

# Start the application
echo "Starting FastAPI application..."
exec uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}
