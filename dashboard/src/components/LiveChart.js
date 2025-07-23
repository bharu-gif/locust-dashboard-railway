import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const socket = new WebSocket("wss://locust-dashboard-railway.railway.internal/ws"); // replace after deploy

export default function LiveChart() {
  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setDataPoints((prev) => [
        ...prev.slice(-29), // last 30 points
        { x: new Date(message.timestamp * 1000), y: message.response_time }
      ]);
    };
  }, []);

  const chartData = {
    datasets: [
      {
        label: "Response Time (ms)",
        data: dataPoints,
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54,162,235,0.2)",
        tension: 0.3
      }
    ]
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: "time",
        time: {
          tooltipFormat: 'HH:mm:ss',
          unit: 'second'
        },
        title: {
          display: true,
          text: "Time"
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Response Time (ms)"
        }
      }
    }
  };

  return (
    <div style={{ width: "90%", margin: "auto", paddingTop: "40px" }}>
      <h2>Live Locust Metrics</h2>
      <Line options={options} data={chartData} />
    </div>
  );
}
