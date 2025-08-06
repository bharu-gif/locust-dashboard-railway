FROM python:3.10-slim

WORKDIR /app

# Copy requirements first for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create non-root user for security
RUN useradd --create-home --shell /bin/bash app
USER app

EXPOSE 8000

# Use environment variable for port (Railway sets PORT automatically)
CMD uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}
