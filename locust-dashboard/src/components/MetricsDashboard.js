import React, { useEffect, useState } from "react";

function MetricsDashboard() {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('wss://locust-dashboard-railway-production.up.railway.app/ws'); // use ws://localhost:8000/ws for local

    ws.onmessage = (event) => {
      const newMetric = JSON.parse(event.data);
      setMetrics((prevMetrics) => [...prevMetrics, newMetric]);
    };

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => ws.close();
  }, []);

  return (
    <div>
      <h1>Locust Real-time Metrics</h1>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Response Time (ms)</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((metric, index) => (
            <tr key={index}>
              <td>{new Date(metric.timestamp * 1000).toLocaleTimeString()}</td>
              <td>{metric.response_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MetricsDashboard;