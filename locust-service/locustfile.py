from locust import HttpUser, task, between
import requests
import threading
import time

DASHBOARD_API_URL = "https://locust-dashboard-railway-production.up.railway.app/api/metrics"  # Replace after deploy

metrics_buffer = []

def post_metrics():
    while True:
        if metrics_buffer:
            try:
                data = metrics_buffer.pop(0)
                requests.post(DASHBOARD_API_URL, json=data)
            except Exception as e:
                print("Failed to post metrics:", e)
        time.sleep(1)

threading.Thread(target=post_metrics, daemon=True).start()

class WebsiteUser(HttpUser):
    wait_time = between(1, 3)

    @task
    def index(self):
        start = time.time()
        response = self.client.get("/")
        latency = time.time() - start
        metrics_buffer.append({
            "timestamp": int(time.time()),
            "response_time": int(latency * 1000)
        })
