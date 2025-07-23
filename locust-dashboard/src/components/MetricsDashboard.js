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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">
          🚀 Locust Real-time Metrics Dashboard
        </h1>

        {/* Chart */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">📊 Response Time Chart</h2>
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
          <h2 className="text-xl font-semibold mb-4 text-gray-700">📋 All Metrics</h2>
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
