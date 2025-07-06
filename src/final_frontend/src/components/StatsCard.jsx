import React from 'react';
import './StatsCard.css';

const StatsCard = ({ title, value, icon: Icon, color, trend }) => {
  return (
    <div className={`stats-card stats-card-${color}`}>
      <div className="stats-content">
        <div className="stats-main">
          <div className={`stats-icon stats-icon-${color}`}>
            <Icon className="icon-lg" />
          </div>
          <div className="stats-text">
            <p className="stats-title">{title}</p>
            <p className="stats-value">{value.toLocaleString()}</p>
          </div>
        </div>
        {trend !== undefined && (
          <div className={`stats-trend ${trend >= 0 ? 'trend-positive' : 'trend-negative'}`}>
            {trend >= 0 ? '+' : ''}{trend}%
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;