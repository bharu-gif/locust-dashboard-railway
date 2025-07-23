from locust import HttpUser, task, between, events
from locust.stats import stats_printer, stats_history
import requests
import threading
import time

DASHBOARD_API_URL = "https://locust-dashboard-railway-production.up.railway.app/api/metrics"  # Update this

def post_metrics():
    while True:
        try:
            stats = {
                "timestamp": int(time.time()),
                "total_requests": stats_history.total.num_requests,
                "failures": stats_history.total.num_failures,
                "avg_response_time": stats_history.total.avg_response_time,
                "median_response_time": stats_history.total.median_response_time,
                "rps": stats_history.total.total_rps,
                "users": len(events.request_success._handlers),  # crude count
                "max_response_time": stats_history.total.max_response_time,
                "min_response_time": stats_history.total.min_response_time,
                "p95": stats_history.total.get_response_time_percentile(0.95),
            }
            requests.post(DASHBOARD_API_URL, json=stats)
        except Exception as e:
            print("Failed to post metrics:", e)
        time.sleep(1)

threading.Thread(target=post_metrics, daemon=True).start()

class WebsiteUser(HttpUser):
    wait_time = between(1, 2)

    @task
    def index(self):
        self.client.get("/")
