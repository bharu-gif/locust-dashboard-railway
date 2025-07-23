import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./styles.css";

const LOCUST_API_URL = "locust-dashboard-railway-production.up.railway.app"; // <- change to FastAPI URL

function StatCard({ title, value, color }) {
  return (
    <div className={`stat-card ${color}`}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}

const MetricsDashboard = () => {
  const [metrics, setMetrics] = useState([]);
  const [users, setUsers] = useState(10);
  const [spawnRate, setSpawnRate] = useState(2);
  const [host, setHost] = useState("https://example.com"); // Optional
  const [running, setRunning] = useState("10");

  useEffect(() => {
    const ws = new WebSocket(`${LOCUST_API_URL.replace(/^http/, "ws")}/ws`);
    ws.onmessage = (event) => {
      const newMetric = JSON.parse(event.data);
      setMetrics((prev) => [...prev.slice(-100), newMetric]);
    };
    return () => ws.close();
  }, []);

  const handleStart = async () => {
    const res = await fetch(`${LOCUST_API_URL}/start-locust`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        users: Number(users),
        spawn_rate: Number(spawnRate),
        host,
      }),
    });
    const data = await res.json();
    if (data.status === "started") setRunning(true);
  };

  const handleStop = async () => {
    const res = await fetch(`${LOCUST_API_URL}/stop-locust`, {
      method: "POST",
    });
    const data = await res.json();
    if (data.status === "stopped") setRunning(false);
  };

  const latest = metrics.at(-1);

  return (
    <div className="dashboard">
      <h1>Locust Metrics Dashboard</h1>

      {/* Control Panel */}
      <div className="control-panel">
        <input
          type="number"
          placeholder="Users"
          value={users}
          onChange={(e) => setUsers(e.target.value)}
        />
        <input
          type="number"
          placeholder="Spawn Rate"
          value={spawnRate}
          onChange={(e) => setSpawnRate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Target Host"
          value={host}
          onChange={(e) => setHost(e.target.value)}
        />
        <input
          type="text"
          placeholder="Run Time"
          value={running}
          onChange={(e) => setRunning(e.target.value)}
        />
        <button className="start-btn" onClick={handleStart} disabled={running}>
          Start
        </button>
        <button className="stop-btn" onClick={handleStop} disabled={!running}>
          Stop
        </button>
      </div>

      {/* Stat Cards */}
      <div className="stats-grid">
        <StatCard title="Users" value={latest?.users ?? 0} color="bg-blue" />
        <StatCard title="RPS" value={latest?.rps?.toFixed(2)} color="bg-green" />
        <StatCard
          title="Avg Response Time"
          value={`${latest?.avg_response_time?.toFixed(2)} ms`}
          color="bg-yellow"
        />
        <StatCard title="Failures" value={latest?.failures ?? 0} color="bg-red" />
      </div>

      {/* Line Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={metrics}>
          <CartesianGrid stroke="#e0e0e0" />
          <XAxis dataKey="timestamp" tickFormatter={(ts) =>
            new Date(ts * 1000).toLocaleTimeString()
          } />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="avg_response_time"
            stroke="#4f46e5"
            name="Avg RT"
          />
          <Line type="monotone" dataKey="rps" stroke="#10b981" name="RPS" />
        </LineChart>
      </ResponsiveContainer>

      {/* Metrics Table */}
      <table className="metrics-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Users</th>
            <th>RPS</th>
            <th>Avg RT</th>
            <th>Failures</th>
            <th>P95</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((m, i) => (
            <tr key={i}>
              <td>{new Date(m.timestamp * 1000).toLocaleTimeString()}</td>
              <td>{m.users}</td>
              <td>{m.rps?.toFixed(2)}</td>
              <td>{m.avg_response_time?.toFixed(2)}</td>
              <td>{m.failures}</td>
              <td>{m.p95?.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MetricsDashboard;
