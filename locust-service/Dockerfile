FROM python:3.10

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

CMD ["locust", "-f", "locustfile.py", "--host=https://your-api-url.com", "--headless", "-u", "10", "-r", "2", "-t", "10m"]
