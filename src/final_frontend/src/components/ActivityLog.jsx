import React, { useState } from 'react';
import { Search, Filter, Download, Clock, User, Activity } from 'lucide-react';
import './ActivityLog.css';

const ActivityLog = ({ logs }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterResult, setFilterResult] = useState('all');
  const [showExportMenu, setShowExportMenu] = useState(false);

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterResult === 'all' || log.result === filterResult;
    return matchesSearch && matchesFilter;
  });

  const getResultBadge = (result) => {
    if (result === 'Safe') {
      return 'badge badge-green';
    } else if (result === 'Malicious') {
      return 'badge badge-red';
    }
    return 'badge badge-gray';
  };

  const exportToCSV = () => {
    if (filteredLogs.length === 0) {
      alert('No data to export');
      return;
    }

    const headers = ['ID', 'Action', 'Value', 'Result', 'User', 'Timestamp'];
    
    const csvRows = [
      headers.join(','),
      ...filteredLogs.map(log => [
        log.id,
        `"${log.action}"`,
        log.value,
        `"${log.result}"`,
        `"${log.user}"`,
        `"${log.timestamp?.toLocaleString() || 'Just now'}"`
      ].join(','))
    ];

    const csvContent = csvRows.join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `chainguard-activity-log-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const exportToJSON = () => {
    if (filteredLogs.length === 0) {
      alert('No data to export');
      return;
    }

    const exportData = {
      exportDate: new Date().toISOString(),
      totalRecords: filteredLogs.length,
      filters: {
        searchTerm: searchTerm || 'none',
        resultFilter: filterResult
      },
      data: filteredLogs.map(log => ({
        ...log,
        timestamp: log.timestamp?.toISOString() || new Date().toISOString()
      }))
    };

    const jsonContent = JSON.stringify(exportData, null, 2);
    
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `chainguard-activity-log-${new Date().toISOString().split('T')[0]}.json`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="activity-log">
      <div className="log-header">
        <div className="log-title-section">
          <div className="log-icon">
            <Activity className="icon-md" />
          </div>
          <h3 className="log-title">
            Activity Log
          </h3>
        </div>
        
        <div className="export-section">
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            disabled={filteredLogs.length === 0}
            className="export-button"
          >
            <Download className="icon-sm" />
            <span>Export</span>
          </button>
          
          {showExportMenu && (
            <div className="export-menu">
              <div className="export-menu-content">
                <button
                  onClick={() => {
                    exportToCSV();
                    setShowExportMenu(false);
                  }}
                  className="export-option"
                >
                  Export as CSV
                </button>
                <button
                  onClick={() => {
                    exportToJSON();
                    setShowExportMenu(false);
                  }}
                  className="export-option"
                >
                  Export as JSON
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="log-filters">
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-container">
          <Filter className="filter-icon" />
          <select
            value={filterResult}
            onChange={(e) => setFilterResult(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Results</option>
            <option value="Safe">Safe</option>
            <option value="Malicious">Malicious</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="log-table">
          <thead>
            <tr className="table-header">
              <th className="table-cell">ID</th>
              <th className="table-cell">Action</th>
              <th className="table-cell">Value</th>
              <th className="table-cell">Result</th>
              <th className="table-cell">User</th>
              <th className="table-cell">Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log.id} className="table-row">
                <td className="table-cell table-data">#{log.id}</td>
                <td className="table-cell table-data table-data-bold">{log.action}</td>
                <td className="table-cell table-data table-data-muted">{log.value}</td>
                <td className="table-cell table-data">
                  <span className={getResultBadge(log.result)}>{log.result}</span>
                </td>
                <td className="table-cell table-data table-data-muted user-cell">
                  <div className="user-info">
                    <User className="icon-sm" />
                    <span className="user-name">{log.user}</span>
                  </div>
                </td>
                <td className="table-cell table-data table-data-muted">
                  <div className="time-info">
                    <Clock className="icon-sm" />
                    <span>{log.timestamp?.toLocaleTimeString() || 'Just now'}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredLogs.length === 0 && (
          <div className="empty-state">
            No transactions found matching your criteria.
          </div>
        )}
      </div>

      {showExportMenu && (
        <div 
          className="export-overlay" 
          onClick={() => setShowExportMenu(false)}
        />
      )}
    </div>
  );
};

export default ActivityLog;