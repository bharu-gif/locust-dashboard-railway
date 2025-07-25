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
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import "./styles.css";

const LOCUST_API_URL = "https://locust-dashboard-railway-production.up.railway.app";

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
  const [timeLimit, setTimeLimit] = useState("10m");
  const [host, setHost] = useState("https://example.com");
  const [running, setRunning] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState("0m 0s");
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(`${LOCUST_API_URL.replace(/^http/, "ws")}/ws`);
    ws.onmessage = (event) => {
      const newMetric = JSON.parse(event.data);
      setMetrics((prev) => [...prev.slice(-100), newMetric]);
    };
    return () => ws.close();
  }, []);

  useEffect(() => {
    let timer;
    if (running && startTime) {
      timer = setInterval(() => {
        const seconds = Math.floor((Date.now() - startTime) / 1000);
        const minutes = Math.floor(seconds / 60);
        const sec = seconds % 60;
        setElapsedTime(`${minutes}m ${sec}s`);
      }, 1000);
    } else {
      setElapsedTime("0m 0s");
    }
    return () => clearInterval(timer);
  }, [running, startTime]);

  const handleStart = async () => {
    setStarting(true);
    const res = await fetch(`${LOCUST_API_URL}/start-locust`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        users: Number(users),
        rate: Number(spawnRate),
        time: timeLimit,
        host,
      }),
    });

    const data = await res.json();
    setStarting(false);
    if (data.status && data.status.toLowerCase().includes("locust started")) {
      setRunning(true);
      setStartTime(Date.now());
    } else {
      alert("Failed to start Locust");
    }
  };

  const handleStop = async () => {
    const res = await fetch(`${LOCUST_API_URL}/stop-locust`, {
      method: "POST",
    });
    const data = await res.json();
    if (data.status === "stopped") {
      setRunning(false);
      setStartTime(null);
    } else {
      alert("Failed to stop Locust");
    }
  };

  const exportChartAsImage = () => {
    const chartNode = document.getElementById("export-container");
    if (!chartNode) return;
    htmlToImage.toPng(chartNode).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "locust-metrics.png";
      link.href = dataUrl;
      link.click();
    });
  };

  const exportChartAsPDF = () => {
    const chartNode = document.getElementById("export-container");
    if (!chartNode) return;
    htmlToImage.toPng(chartNode).then((dataUrl) => {
      const pdf = new jsPDF();
      pdf.addImage(dataUrl, "PNG", 10, 10, 190, 140);
      pdf.save("locust-metrics.pdf");
    });
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(metrics);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Metrics");
    XLSX.writeFile(workbook, "locust_metrics.xlsx");
  };

  const latest = metrics.at(-1);

  return (
    <div className={`dashboard ${darkMode ? "dark-mode" : ""}`}>
      <h1>Locust Metrics Dashboard</h1>

      <div className="top-bar">
        <div className="status-indicator">
          <span className={`dot ${running ? "green" : "red"}`}></span>
          {running ? "Running" : "Stopped"}
        </div>
        <div className="dark-toggle">
          <label>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            Dark Mode
          </label>
        </div>
      </div>

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
          value={timeLimit}
          onChange={(e) => setTimeLimit(e.target.value)}
        />

        <button
          className="start-btn"
          onClick={handleStart}
          disabled={running || starting}
        >
          {starting ? <span className="pulse">Starting...</span> : running ? (
            <span className="pulse">Running...</span>
          ) : (
            "Start"
          )}
        </button>
        <button className="stop-btn" onClick={handleStop} disabled={!running}>
          Stop
        </button>
      </div>

      <div className="export-buttons">
        <button onClick={exportChartAsImage}>Export Chart as Image</button>
        <button onClick={exportChartAsPDF}>Export Chart as PDF</button>
        <button onClick={exportToExcel}>Export Metrics to Excel</button>
      </div>

      <div id="export-container">
        <div className="stats-grid">
          <StatCard title="Total Requests" value={latest?.total_requests ?? 0} color="bg-blue" />
          <StatCard title="Users" value={latest?.users ?? 0} color="bg-purple" />
          <StatCard title="RPS" value={latest?.rps?.toFixed(2)} color="bg-green" />
          <StatCard title="Failures" value={latest?.failures ?? 0} color="bg-red" />
          <StatCard title="Avg Response Time" value={`${latest?.avg_response_time?.toFixed(2)} ms`} color="bg-yellow" />
          <StatCard title="Median Response Time" value={`${latest?.median_response_time?.toFixed(2)} ms`} color="bg-orange" />
          <StatCard title="Max Response Time" value={`${latest?.max_response_time?.toFixed(2)} ms`} color="bg-gray" />
          <StatCard title="Min Response Time" value={`${latest?.min_response_time?.toFixed(2)} ms`} color="bg-pink" />
          <StatCard title="P95 Latency" value={`${latest?.p95?.toFixed(2)} ms`} color="bg-indigo" />
          <StatCard title="Uptime" value={elapsedTime} color="bg-teal" />
        </div>

        <div id="chart-container">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={metrics}>
              <CartesianGrid stroke="#f0f0f0" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(ts) => new Date(ts * 1000).toLocaleTimeString()}
              />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="avg_response_time" stroke="#4f46e5" name="Avg RT" />
              <Line type="monotone" dataKey="median_response_time" stroke="#f59e0b" name="Median RT" />
              <Line type="monotone" dataKey="rps" stroke="#10b981" name="RPS" />
              <Line type="monotone" dataKey="failures" stroke="#ef4444" name="Failures" />
              <Line type="monotone" dataKey="p95" stroke="#8b5cf6" name="P95 RT" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MetricsDashboard;
