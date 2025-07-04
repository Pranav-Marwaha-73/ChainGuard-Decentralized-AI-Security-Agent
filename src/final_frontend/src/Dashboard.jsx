import React from "react";
import StatsCard from "./StatsCard";
import LogsTable from "./LogsTable";
import Charts from "./Charts";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2>🔐 ChainGuard Security Dashboard</h2>
      <div className="stats-section">
        <StatsCard title="Protected DApps" value={12} />
        <StatsCard title="Total Txns Analyzed" value={5032} />
        <StatsCard title="Malicious Txns" value={123} />
      </div>
      <Charts />
      <LogsTable />
    </div>
  );
};

export default Dashboard;
