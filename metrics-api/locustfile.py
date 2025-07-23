from locust import HttpUser, task, between, events
import requests
import threading
import time

DASHBOARD_API_URL = "https://locust-dashboard-railway-production.up.railway.app/api/metrics"
environment = None  # Will be set later

def post_metrics_loop(env):
    while True:
        try:
            stats = env.stats.total  # ✅ Correct way to access total stats
            metrics = {
                "timestamp": int(time.time()),
                "total_requests": stats.num_requests,
                "failures": stats.num_failures,
                "avg_response_time": stats.avg_response_time,
                "median_response_time": stats.median_response_time,
                "rps": stats.total_rps,
                "users": env.runner.user_count if env.runner else 0,
                "max_response_time": stats.max_response_time,
                "min_response_time": stats.min_response_time,
                "p95": stats.get_response_time_percentile(0.95),
            }
            requests.post(DASHBOARD_API_URL, json=metrics)
        except Exception as e:
            print("Failed to post metrics:", e)
        time.sleep(1)

# Hook: Called once Locust is ready
@events.init.add_listener
def on_locust_init(env, **kwargs):
    global environment
    environment = env
    threading.Thread(target=post_metrics_loop, args=(env,), daemon=True).start()

class WebsiteUser(HttpUser):
    wait_time = between(1, 2)

    @task
    def index(self):
        self.client.get("/")
