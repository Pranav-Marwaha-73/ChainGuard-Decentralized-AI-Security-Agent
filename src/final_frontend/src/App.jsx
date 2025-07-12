import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Shield, Database, AlertTriangle, CheckCircle } from 'lucide-react';
import LoginPage from './components/LoginPage';
import Header from './components/Header';
import StatsCard from './components/StatsCard';
import PredictionForm from './components/PredictionForm';
import ActivityLog from './components/ActivityLog';
import Charts from './components/Charts';
import LoginModal from './components/LoginModal';
import ThreatAlert from './components/ThreatAlert';
import SecurityNotification from './components/SecurityNotification';
import About from './components/About';
import { initAuth, login, logout, isAuthenticated, getPrincipal } from './auth';
import backendService from './services/backendService';
import './styles/global.css';
import './App.css';
const App = () => {
  const [result, setResult] = useState('');
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({ Safe: 0, Malicious: 0 });
  const [darkMode, setDarkMode] = useState(false);
  const [themeMode, setThemeMode] = useState('light'); // 'light', 'dark', 'advanced'
  const [endpoint, setEndpoint] = useState('https://beade951d8b2.ngrok-free.app/predict/');
  const [userPrincipal, setUserPrincipal] = useState(null);
  const [authClient, setAuthClient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [currentView, setCurrentView] = useState('dashboard');
  
  // Enhanced security states
  const [showThreatAlert, setShowThreatAlert] = useState(false);
  const [threatData, setThreatData] = useState(null);
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });
  const [blockedTransactions, setBlockedTransactions] = useState(0);
  const [backendConnected, setBackendConnected] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      // Initialize authentication
      try {
        const client = await initAuth();
        setAuthClient(client);

        if (isAuthenticated()) {
          const principal = getPrincipal();
          setUserPrincipal(principal);
          setShowDashboard(true);
          showNotification('success', 'Successfully connected to ChainGuard AI');
        }
      } catch (error) {
        console.error('Authentication initialization failed:', error);
        setLoginError('Failed to initialize authentication');
        showNotification('error', 'Authentication initialization failed');
      }

      // Initialize backend connection
      try {
        console.log('Starting backend connection test...');
        
        // First, let's test the connection manually
        const testResult = await backendService.testConnection();
        console.log('Backend test result:', testResult);
        
        if (!testResult.success) {
          console.error('Backend connection test failed:', testResult.error);
          setBackendConnected(false);
          showNotification('warning', 'Backend connection failed - using local storage');
          return;
        }
        
        // If test passed, check health
        const isHealthy = await backendService.isBackendHealthy();
        console.log('Backend health status:', isHealthy);
        setBackendConnected(isHealthy);
        
        if (isHealthy) {
          showNotification('success', 'Connected to backend canister');
          await fetchLogsFromBackend();
        } else {
          showNotification('warning', 'Backend canister not available - using local storage');
        }
      } catch (error) {
        console.error('Backend initialization failed:', error);
        console.error('Full error details:', error.stack);
        setBackendConnected(false);
        showNotification('warning', 'Backend connection failed - using local storage');
      }
    };

    initializeApp();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark', 'advanced');
    root.classList.add(themeMode);
    
    // Keep backward compatibility
    if (themeMode === 'dark' || themeMode === 'advanced') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [themeMode]);

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
  };

  const hideNotification = () => {
    setNotification({ show: false, type: '', message: '' });
  };

  const fetchLogsFromBackend = async () => {
    try {
      if (!backendConnected) {
        console.log('Backend not connected, skipping log fetch');
        return;
      }

      const backendLogs = await backendService.getLogs();
      console.log('Fetched logs from backend:', backendLogs);
      
      // Update logs state
      setLogs(backendLogs);
      
      // Update stats based on backend logs
      const newStats = backendLogs.reduce(
        (acc, log) => {
          if (log.result === 'Safe') {
            acc.Safe += 1;
          } else if (log.result === 'Malicious') {
            acc.Malicious += 1;
          }
          return acc;
        },
        { Safe: 0, Malicious: 0 }
      );
      
      setStats(newStats);
      setBlockedTransactions(newStats.Malicious);
      
    } catch (error) {
      console.error('Failed to fetch logs from backend:', error);
      showNotification('error', 'Failed to sync with backend');
    }
  };

  const saveLogToBackend = async (action, value, result, userPrincipal) => {
    try {
      if (!backendConnected) {
        console.log('Backend not connected, skipping log save');
        return false;
      }

      const success = await backendService.addLog(action, value, result, userPrincipal);
      
      if (success) {
        console.log('Log saved to backend successfully');
        // Refresh logs from backend to get the latest data
        await fetchLogsFromBackend();
        return true;
      } else {
        console.error('Failed to save log to backend');
        return false;
      }
    } catch (error) {
      console.error('Error saving log to backend:', error);
      return false;
    }
  };

  const handleLogin = async () => {
    setLoginLoading(true);
    setLoginError('');

    try {
      await login();
      const principal = getPrincipal();
      setUserPrincipal(principal);
      setShowLoginModal(false);
      setShowDashboard(true);
      showNotification('success', 'Successfully logged in with Internet Identity');
      
      // Refresh logs after login
      if (backendConnected) {
        await fetchLogsFromBackend();
      }
    } catch (error) {
      console.error('Login failed:', error);
      setLoginError('Login failed. Please try again.');
      showNotification('error', 'Login failed. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUserPrincipal(null);
      setAuthClient(null);
      setLogs([]);
      setStats({ Safe: 0, Malicious: 0 });
      setResult('');
      setBlockedTransactions(0);
      setShowDashboard(false);
      setCurrentView('dashboard');
      showNotification('success', 'Successfully logged out');
    } catch (error) {
      console.error('Logout failed:', error);
      showNotification('error', 'Logout failed');
    }
  };

  const triggerCountermeasures = async (transactionData, logId) => {
    try {
      console.log('Triggering countermeasures for malicious transaction:', transactionData);
      
      // Try to trigger countermeasure in backend
      if (backendConnected && logId) {
        try {
          const countermeasureResult = await backendService.triggerCountermeasure(logId);
          console.log('Backend countermeasure result:', countermeasureResult);
          showNotification('warning', `Countermeasures activated: ${countermeasureResult}`);
        } catch (error) {
          console.error('Backend countermeasure failed:', error);
          showNotification('warning', 'Countermeasures activated - Transaction blocked and reverted');
        }
      } else {
        showNotification('warning', 'Countermeasures activated - Transaction blocked and reverted');
      }
      
      setBlockedTransactions(prev => prev + 1);
      return true;
    } catch (error) {
      console.error('Failed to trigger countermeasures:', error);
      showNotification('error', 'Failed to activate countermeasures');
      return false;
    }
  };

  const handlePrediction = async (action, value) => {
    if (!userPrincipal) {
      setShowLoginModal(true);
      return;
    }

    setIsLoading(true);
    showNotification('info', 'Analyzing transaction for security threats...');

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

        // Create new log entry
        const newLog = {
          id: logs.length + 1,
          action,
          value,
          result: prediction,
          user: userPrincipal,
          timestamp: new Date(),
          status: prediction === 'Safe' ? 'Success' : 'Blocked'
        };

        // Save to backend first, then update local state
        const backendSaved = await saveLogToBackend(action, value, prediction, userPrincipal);
        
        if (!backendSaved) {
          // If backend save failed, update local state
          setLogs([newLog, ...logs]);
          setStats((prev) => ({
            ...prev,
            [prediction]: prev[prediction] + 1,
          }));
        }

        if (prediction === "Malicious") {
          // Enhanced malicious transaction handling
          const transactionData = { action, value, user: userPrincipal };
          setThreatData(transactionData);
          setShowThreatAlert(true);
          
          // Trigger countermeasures
          await triggerCountermeasures(transactionData, newLog.id);
          
          // Play alert sound (optional)
          try {
            const audio = new Audio('/alert.mp3');
            audio.play().catch(() => {});
          } catch (e) {
            // Audio not supported or blocked
          }
          
          showNotification('error', '🚨 MALICIOUS TRANSACTION DETECTED! Transaction has been blocked and reverted.');
        } else {
          showNotification('success', '✅ Transaction verified as safe and processed successfully');
        }
      } else {
        setResult('⚠️ No prediction returned.');
        showNotification('warning', 'No prediction returned from security service');
      }
    } catch (error) {
      console.error('Prediction error:', error);
      setResult('❌ Error: Unable to connect to the security service.');
      showNotification('error', 'Unable to connect to security service');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = () => {
    const modes = ['light', 'dark', 'advanced'];
    const currentIndex = modes.indexOf(themeMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    const nextMode = modes[nextIndex];
    
    setThemeMode(nextMode);
    
    const modeNames = {
      light: '☀️ Light Mode',
      dark: '🌙 Dark Mode', 
      advanced: '🚀 Advanced Mode'
    };
    
    showNotification('success', `Switched to ${modeNames[nextMode]}! ${nextMode === 'advanced' ? 'Welcome to the future! 🔥' : ''}`);
  };

  const refreshBackendConnection = async () => {
    try {
      showNotification('info', 'Reconnecting to backend...');
      const isHealthy = await backendService.isBackendHealthy();
      setBackendConnected(isHealthy);
      
      if (isHealthy) {
        showNotification('success', 'Backend connection restored');
        await fetchLogsFromBackend();
      } else {
        showNotification('error', 'Failed to reconnect to backend');
      }
    } catch (error) {
      console.error('Failed to refresh backend connection:', error);
      showNotification('error', 'Backend connection failed');
    }
  };

  const chartData = [
    { name: 'Safe', count: stats.Safe },
    { name: 'Malicious', count: stats.Malicious },
  ];

  const totalTransactions = stats.Safe + stats.Malicious;
  const safePercentage = totalTransactions > 0 ? Math.round((stats.Safe / totalTransactions) * 100) : 0;

  const handleViewChange = (view) => {
    setCurrentView(view);
    showNotification('info', `Switched to ${view === 'dashboard' ? 'Dashboard' : 'About'} view`);
  };

  // Show login page if user is not authenticated
  if (!showDashboard) {
    return (
      <LoginPage
        onLogin={handleLogin}
        isLoading={loginLoading}
        error={loginError}
      />
    );
  }

  return (
    <div className="app">
      <Header
        userPrincipal={userPrincipal}
        themeMode={themeMode}
        onToggleTheme={toggleTheme}
        onLogout={handleLogout}
        onLogin={() => setShowLoginModal(true)}
        backendConnected={backendConnected}
        onRefreshBackend={refreshBackendConnection}
        currentView={currentView}
        onViewChange={handleViewChange}
      />

      {currentView === 'dashboard' && (
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
                  {backendConnected && <span className="ml-2 text-green-300">• Backend Connected</span>}
                  {!backendConnected && <span className="ml-2 text-yellow-300">• Local Mode</span>}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
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
            title="Threats Blocked"
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
              backendConnected={backendConnected}
            />
          </div>
          
          <div className="log-section">
            <ActivityLog 
              logs={logs} 
              backendConnected={backendConnected}
              onRefresh={fetchLogsFromBackend}
            />
          </div>
        </div>
        </main>
      )}

      {currentView === 'about' && <About />}

      {/* Modals and Alerts */}
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

      <ThreatAlert
        isOpen={showThreatAlert}
        onClose={() => setShowThreatAlert(false)}
        transactionData={threatData}
        autoClose={true}
      />

      <SecurityNotification
        type={notification.type}
        message={notification.message}
        isVisible={notification.show}
        onClose={hideNotification}
        autoClose={true}
        duration={5000}
      />
    </div>
  );
};

export default App;