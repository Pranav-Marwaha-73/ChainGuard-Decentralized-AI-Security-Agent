import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Shield, Database, AlertTriangle, CheckCircle } from 'lucide-react';
import Header from './components/Header';
import StatsCard from './components/StatsCard';
import PredictionForm from './components/PredictionForm';
import ActivityLog from './components/ActivityLog';
import Charts from './components/Charts';
import LoginModal from './components/LoginModal';
import { initAuth, login, logout, isAuthenticated, getPrincipal } from './auth';
import './styles/global.css';
import './App.css';

const App = () => {
  const [result, setResult] = useState('');
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({ Safe: 0, Malicious: 0 });
  const [darkMode, setDarkMode] = useState(false);
  const [endpoint, setEndpoint] = useState('https://2b71-49-43-91-234.ngrok-free.app/predict/');
  const [userPrincipal, setUserPrincipal] = useState(null);
  const [authClient, setAuthClient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const client = await initAuth();
        setAuthClient(client);
        
        if (isAuthenticated()) {
          const principal = getPrincipal();
          setUserPrincipal(principal);
        }
      } catch (error) {
        console.error('Authentication initialization failed:', error);
        setLoginError('Failed to initialize authentication');
      }
    };

    initializeAuth();
  }, []);

  useEffect(() => {
    // Apply dark mode to document root element
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLogin = async () => {
    setLoginLoading(true);
    setLoginError('');
    
    try {
      await login();
      const principal = getPrincipal();
      setUserPrincipal(principal);
      setShowLoginModal(false);
    } catch (error) {
      console.error('Login failed:', error);
      setLoginError('Login failed. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUserPrincipal(null);
      setAuthClient(null);
      // Clear any user-specific data
      setLogs([]);
      setStats({ Safe: 0, Malicious: 0 });
      setResult('');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handlePrediction = async (action, value) => {
    if (!userPrincipal) {
      setShowLoginModal(true);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        endpoint,
        {
          action,
          value: parseFloat(value.toString()),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
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
          timestamp: new Date(),
        };
        setLogs([newLog, ...logs]);

        setStats((prev) => ({
          ...prev,
          [prediction]: prev[prediction] + 1,
        }));
      } else {
        setResult('⚠️ No prediction returned.');
      }
    } catch (error) {
      console.error('Prediction error:', error);
      setResult('❌ Error: Unable to connect to the security service.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const chartData = [
    { name: 'Safe', count: stats.Safe },
    { name: 'Malicious', count: stats.Malicious },
  ];

  const totalTransactions = stats.Safe + stats.Malicious;
  const safePercentage = totalTransactions > 0 ? Math.round((stats.Safe / totalTransactions) * 100) : 0;

  return (
    <div className="app">
      <Header
        userPrincipal={userPrincipal}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        onLogout={handleLogout}
        onLogin={() => setShowLoginModal(true)}
      />

      <main className="main-content">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-card">
            <div className="hero-content">
              <div className="hero-icon">
                <Shield className="icon-xl" />
              </div>
              <div className="hero-text">
                <h1 className="hero-title">ChainGuard AI Security Dashboard</h1>
                <p className="hero-subtitle">
                  Real-time blockchain transaction analysis and threat detection
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <StatsCard
            title="Total Analyzed"
            value={totalTransactions}
            icon={Database}
            color="blue"
          />
          <StatsCard
            title="Safe Transactions"
            value={stats.Safe}
            icon={CheckCircle}
            color="green"
            trend={safePercentage}
          />
          <StatsCard
            title="Malicious Blocked"
            value={stats.Malicious}
            icon={AlertTriangle}
            color="red"
          />
          <StatsCard
            title="Protection Rate"
            value={safePercentage}
            icon={Shield}
            color="orange"
          />
        </div>

        {/* Charts Section */}
        <div className="charts-section">
          <Charts data={chartData} />
        </div>

        {/* Prediction Form and Activity Log */}
        <div className="content-grid">
          <div className="form-section">
            <PredictionForm
              onSubmit={handlePrediction}
              isLoading={isLoading}
              result={result}
              endpoint={endpoint}
              onEndpointChange={setEndpoint}
            />
          </div>
          
          <div className="log-section">
            <ActivityLog logs={logs} />
          </div>
        </div>
      </main>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => {
          setShowLoginModal(false);
          setLoginError('');
        }}
        onLogin={handleLogin}
        isLoading={loginLoading}
        error={loginError}
      />
    </div>
  );
};

export default App;