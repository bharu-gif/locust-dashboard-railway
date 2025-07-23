import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function MetricsDashboard() {
  const [metrics, setMetrics] = useState([]);
  const [users, setUsers] = useState(10);
  const [rate, setRate] = useState(2);
  const [time, setTime] = useState("10m");
  const [host, setHost] = useState("https://your-api-url.com");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const ws = new WebSocket("wss://locust-dashboard-railway-production.up.railway.app/ws");

    ws.onmessage = (event) => {
      const newMetric = JSON.parse(event.data);
      setMetrics((prev) => [...prev, newMetric]);
    };

    ws.onopen = () => console.log("WebSocket connected");
    ws.onclose = () => console.log("WebSocket disconnected");

    return () => ws.close();
  }, []);

  const startLocustTest = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("https://locust-dashboard-railway-production.up.railway.app/start-locust", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ users, rate, time, host }),
      });

      const data = await res.json();
      setMessage(data.status || data.error);
    } catch (error) {
      setMessage("Failed to start Locust: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">
          🚀 Locust Real-time Metrics Dashboard
        </h1>

        {/* Form to start Locust */}
        <form
          onSubmit={startLocustTest}
          className="bg-white shadow-lg rounded-lg p-6 mb-10"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            🧪 Start Load Test
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="number"
              min="1"
              value={users}
              onChange={(e) => setUsers(e.target.value)}
              className="border p-2 rounded"
              placeholder="Users"
            />
            <input
              type="number"
              min="1"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="border p-2 rounded"
              placeholder="Spawn Rate"
            />
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="border p-2 rounded"
              placeholder="Duration (e.g. 10m)"
            />
            <input
              type="text"
              value={host}
              onChange={(e) => setHost(e.target.value)}
              className="border p-2 rounded"
              placeholder="Target Host URL"
            />
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            disabled={loading}
          >
            {loading ? "Starting..." : "Start Locust Test"}
          </button>
          {message && (
            <p className="mt-2 text-sm text-gray-600">{message}</p>
          )}
        </form>

        {/* Chart */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            📊 Response Time Chart
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={metrics}>
              <CartesianGrid stroke="#e0e0e0" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(ts) =>
                  new Date(ts * 1000).toLocaleTimeString().replace(/:\d+ /, " ")
                }
              />
              <YAxis dataKey="response_time" unit="ms" />
              <Tooltip
                labelFormatter={(ts) =>
                  `Time: ${new Date(ts * 1000).toLocaleTimeString()}`
                }
              />
              <Line
                type="monotone"
                dataKey="response_time"
                stroke="#4f46e5"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Table */}
        <div className="bg-white shadow-lg rounded-lg p-6 overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            📋 All Metrics
          </h2>
          <table className="min-w-full table-auto border border-gray-200">
            <thead className="bg-indigo-100 text-indigo-900">
              <tr>
                <th className="px-4 py-2 text-left">Timestamp</th>
                <th className="px-4 py-2 text-left">Response Time (ms)</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((metric, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="px-4 py-2">
                    {new Date(metric.timestamp * 1000).toLocaleTimeString()}
                  </td>
                  <td className="px-4 py-2">{metric.response_time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MetricsDashboard;
