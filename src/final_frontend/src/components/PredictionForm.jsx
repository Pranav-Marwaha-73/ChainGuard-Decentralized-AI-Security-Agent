import React, { useState } from 'react';
import { Send, AlertTriangle, CheckCircle, Loader2, Server } from 'lucide-react';
import './PredictionForm.css';

const PredictionForm = ({ 
  onSubmit, 
  isLoading, 
  result, 
  endpoint, 
  onEndpointChange 
}) => {
  const [action, setAction] = useState('transfer');
  const [value, setValue] = useState(100);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(action, value);
  };

  const getResultIcon = () => {
    if (result.includes('Safe')) return <CheckCircle className="result-icon result-icon-safe" />;
    if (result.includes('Malicious')) return <AlertTriangle className="result-icon result-icon-malicious" />;
    return null;
  };

  const getResultClass = () => {
    if (result.includes('Safe')) return 'result-safe';
    if (result.includes('Malicious')) return 'result-malicious';
    return 'result-default';
  };

  return (
    <div className="prediction-form">
      <div className="form-header">
        <div className="form-icon">
          <Server className="icon-md" />
        </div>
        <h3 className="form-title">
          Transaction Analysis
        </h3>
      </div>

      <div className="form-content">
        <div className="form-group">
          <label className="form-label">
            DApp Endpoint
          </label>
          <select
            value={endpoint}
            onChange={(e) => onEndpointChange(e.target.value)}
            className="form-select"
          >
            <option value="https://f07e-49-43-91-234.ngrok-free.app/predict/">DApp #1 (Primary)</option>
            <option value="https://example-dapp2.ngrok-free.app/predict/">DApp #2 (Secondary)</option>
            <option value="https://example-dapp3.ngrok-free.app/predict/">DApp #3 (Backup)</option>
          </select>
        </div>

        <form onSubmit={handleSubmit} className="prediction-form-inner">
          <div className="form-group">
            <label className="form-label">
              Action Type
            </label>
            <input
              type="text"
              value={action}
              onChange={(e) => setAction(e.target.value)}
              className="form-input"
              placeholder="e.g., transfer, swap, approve"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Transaction Value
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="form-input"
              placeholder="Enter amount"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="submit-button"
          >
            {isLoading ? (
              <>
                <Loader2 className="icon-md animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Send className="icon-md" />
                <span>Analyze Transaction</span>
              </>
            )}
          </button>
        </form>

        {result && (
          <div className={`result-container ${getResultClass()}`}>
            <div className="result-header">
              {getResultIcon()}
              <span className="result-label">Analysis Result:</span>
            </div>
            <p className="result-text">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionForm;