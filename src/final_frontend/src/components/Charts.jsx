import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, PieChart as PieChartIcon } from 'lucide-react';
import './Charts.css';

const Charts = ({ data }) => {
  const pieColors = ['#00ff88', '#ff3366'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p className="tooltip-text">{`${label}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="charts-container">
      <div className="chart-card">
        <div className="chart-header">
          <div className="chart-icon chart-icon-blue">
            <TrendingUp className="icon-md" />
          </div>
          <h3 className="chart-title">
            Transaction Analysis
          </h3>
        </div>
        
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data} margin={{ top: 20, right: 30, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="chart-grid" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#6b7280' }} 
                className="chart-axis"
              />
              <YAxis 
                allowDecimals={false} 
                tick={{ fill: '#6b7280' }} 
                className="chart-axis"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar
                dataKey="count"
                fill="#3b82f6"
                name="Transaction Count"
                radius={[4, 4, 0, 0]}
                className="chart-bar"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-card">
        <div className="chart-header">
          <div className="chart-icon chart-icon-purple">
            <PieChartIcon className="icon-md" />
          </div>
          <h3 className="chart-title">
            Security Overview
          </h3>
        </div>
        
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, value }) => `${name}: ${value}`}
                labelLine={false}
                className="chart-pie-label"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={pieColors[index % pieColors.length]}
                    className="chart-pie-cell"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Charts;