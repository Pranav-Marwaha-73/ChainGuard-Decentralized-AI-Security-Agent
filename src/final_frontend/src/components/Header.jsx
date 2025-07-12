import React from 'react';
import { Shield, Moon, Sun, LogOut, User, Activity, LogIn, RefreshCw, Wifi, WifiOff, Info, Home, Zap } from 'lucide-react';
import './Header.css';

const Header = ({ userPrincipal, themeMode, onToggleTheme, onLogout, onLogin, backendConnected, onRefreshBackend, currentView, onViewChange }) => {
  
  const getThemeIcon = () => {
    switch (themeMode) {
      case 'light': return <Sun className="icon-md" />;
      case 'dark': return <Moon className="icon-md" />;
      case 'advanced': return <Zap className="icon-md" />;
      default: return <Sun className="icon-md" />;
    }
  };
  
  const getThemeTitle = () => {
    switch (themeMode) {
      case 'light': return 'Switch to Dark Mode';
      case 'dark': return 'Switch to Advanced Mode';
      case 'advanced': return 'Switch to Light Mode';
      default: return 'Switch Theme';
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="header-brand">
            <div className="brand-icon-container">
              <Shield className="brand-icon" />
              <div className="status-indicator"></div>
            </div>
            <div className="brand-text">
              <h1 className="brand-title">
                ChainGuard AI
              </h1>
              <p className="brand-subtitle">Security Agent</p>
            </div>
          </div>

          {/* Navigation Menu */}
          {userPrincipal && (
            <nav className="header-nav">
              <button
                onClick={() => onViewChange('dashboard')}
                className={`nav-button ${currentView === 'dashboard' ? 'nav-button-active' : ''}`}
              >
                <Home className="icon-sm" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => onViewChange('about')}
                className={`nav-button ${currentView === 'about' ? 'nav-button-active' : ''}`}
              >
                <Info className="icon-sm" />
                <span>About</span>
              </button>
            </nav>
          )}

          <div className="header-actions">
            {/* Backend Connection Status */}
            <div className="backend-status">
              {backendConnected ? (
                <div className="connection-status">
                  <Wifi className="icon-sm" />
                  <span className="status-text">Backend Online</span>
                </div>
              ) : (
                <div className="connection-status-offline">
                  <WifiOff className="icon-sm" />
                  <span className="status-text-offline">Backend Offline</span>
                  <button
                    onClick={onRefreshBackend}
                    className="refresh-button"
                    title="Retry backend connection"
                  >
                    <RefreshCw className="icon-sm" />
                  </button>
                </div>
              )}
            </div>

            {userPrincipal ? (
              <div className="user-section">
                <div className="connection-status">
                  <Activity className="icon-sm" />
                  <span className="status-text">
                    Connected
                  </span>
                </div>
                <div className="user-info">
                  <User className="icon-sm" />
                  <span className="user-principal">
                    {userPrincipal}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="logout-button"
                  title="Logout"
                >
                  <LogOut className="icon-md" />
                </button>
              </div>
            ) : (
              <div className="user-section">
                <button
                  onClick={onLogin}
                  className="login-button"
                  title="Login with Internet Identity"
                >
                  <LogIn className="icon-md" />
                  <span>Connect Wallet</span>
                </button>
              </div>
            )}

            <button
              onClick={onToggleTheme}
              className="theme-toggle"
              title={getThemeTitle()}
            >
              {getThemeIcon()}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;