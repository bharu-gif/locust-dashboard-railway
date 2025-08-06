FROM python:3.10-slim

WORKDIR /app

# Copy requirements first for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

CMD ["locust", "-f", "locustfile.py", "--host=https://your-api-url.com", "--headless", "-u", "10", "-r", "2", "-t", "10m"]
