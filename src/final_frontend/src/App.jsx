import React, { useEffect, useState } from "react";
import { initAuth, logout } from "./auth";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const App = () => {
  const [action, setAction] = useState("transfer");
  const [value, setValue] = useState(100);
  const [result, setResult] = useState("");
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({ Safe: 0, Malicious: 0 });
  const [darkMode, setDarkMode] = useState(false);
  const [endpoint, setEndpoint] = useState("https://f07e-49-43-91-234.ngrok-free.app/predict/");
  const [userPrincipal, setUserPrincipal] = useState(null);
  const [authClient, setAuthClient] = useState(null);

  useEffect(() => {
    const authenticate = async () => {
      const client = await initAuth();
      setAuthClient(client);
      const identity = client.getIdentity();
      setUserPrincipal(identity.getPrincipal().toText());
    };
    authenticate();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userPrincipal) {
      alert("Please log in to make predictions.");
      return;
    }
    try {
      const response = await axios.post(
        endpoint,
        {
          action,
          value: parseFloat(value),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.prediction) {
        const prediction = response.data.prediction;
        setResult(prediction);

        const newLog = {
          id: logs.length + 1,
          action,
          value,
          result: prediction,
          user: userPrincipal,
        };
        setLogs([newLog, ...logs]);

        setStats((prev) => ({
          ...prev,
          [prediction]: prev[prediction] + 1,
        }));
      } else {
        setResult("⚠️ No prediction returned.");
      }
    } catch (error) {
      setResult("❌ Error: " + error.message);
    }
  };

  const chartData = [
    { name: "Safe", count: stats.Safe },
    { name: "Malicious", count: stats.Malicious },
  ];
  const pieColors = ["#28a745", "#dc3545"];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark", !darkMode);
  };

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <div className="header">
        <h1>ChainGuard AI Detector</h1>

        <div className="auth-info">
          {userPrincipal ? (
            <>
              <p>👤 Logged in as: {userPrincipal}</p>
              <button onClick={() => logout(authClient)}>Logout</button>
            </>
          ) : (
            <p>Connecting to Internet Identity...</p>
          )}
        </div>

        <div>
          <label style={{ marginRight: "10px" }}>DApp Endpoint:</label>
          <select value={endpoint} onChange={(e) => setEndpoint(e.target.value)}>
            <option value="https://f07e-49-43-91-234.ngrok-free.app/predict/">DApp #1</option>
            <option value="https://example-dapp2.ngrok-free.app/predict/">DApp #2</option>
            <option value="https://example-dapp3.ngrok-free.app/predict/">DApp #3</option>
          </select>
        </div>

        <button className="toggle-btn" onClick={toggleDarkMode}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <div className="stats">
        <div className="card">Safe: {stats.Safe}</div>
        <div className="card">Malicious: {stats.Malicious}</div>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, bottom: 5, left: 0 }}>
          <defs>
            <filter id="shadow" height="200%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.2" />
            </filter>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="count"
            fill="#007bff"
            name="Transaction Count"
            radius={[10, 10, 0, 0]}
            animationDuration={800}
            filter="url(#shadow)"
          />
        </BarChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <defs>
            <filter id="pieShadow">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.2" />
            </filter>
          </defs>
          <Pie
            data={chartData}
            dataKey="count"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
            isAnimationActive={true}
            animationDuration={1000}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={pieColors[index % pieColors.length]}
                filter="url(#pieShadow)"
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      <form onSubmit={handleSubmit}>
        <label>Action Type:</label>
        <input value={action} onChange={(e) => setAction(e.target.value)} />

        <label>Value:</label>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <button type="submit">Predict</button>
      </form>

      {result && (
        <p className="result">
          Prediction Result: <strong>{result}</strong>
        </p>
      )}

      <table className="log-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Action</th>
            <th>Value</th>
            <th>Result</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.action}</td>
              <td>{log.value}</td>
              <td>{log.result}</td>
              <td>{log.user}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
