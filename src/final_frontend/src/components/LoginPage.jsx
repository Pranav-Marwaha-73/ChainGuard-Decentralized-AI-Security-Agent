import React, { useState, useEffect } from 'react';
import { Shield, Zap, Brain, Lock, Globe, ChevronRight, Mail, Github, Linkedin, Star, CheckCircle, AlertTriangle, BarChart3, Users, Cpu, Database, Wifi, Code, Sparkles } from 'lucide-react';
import './LoginPage.css';

const LoginPage = ({ onLogin, isLoading, error }) => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Detection",
      description: "92.3% accuracy with Random Forest Classifier"
    },
    {
      icon: Shield,
      title: "Real-time Protection",
      description: "Instant threat detection and countermeasures"
    },
    {
      icon: Globe,
      title: "Decentralized Security",
      description: "Built on Internet Computer Protocol"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Comprehensive transaction visualization"
    }
  ];

  const techStack = [
    { name: "React.js", color: "#61DAFB" },
    { name: "Rust", color: "#CE422B" },
    { name: "Internet Computer", color: "#29ABE2" },
    { name: "Machine Learning", color: "#FF6B6B" },
    { name: "Tailwind CSS", color: "#06B6D4" },
    { name: "Python", color: "#3776AB" }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Create floating particles
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
      particle.style.opacity = Math.random() * 0.5 + 0.1;
      document.querySelector('.login-container')?.appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, 5000);
    };

    const particleInterval = setInterval(createParticle, 300);
    return () => clearInterval(particleInterval);
  }, []);

  return (
    <div className="login-container">
      {/* Animated Background */}
      <div className="animated-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="grid-pattern"></div>
      </div>

      {/* Main Content */}
      <div className={`login-content ${isVisible ? 'visible' : ''}`}>
        {/* Left Panel - Project Info */}
        <div className="info-panel">
          <div className="project-header">
            <div className="logo-container">
              <div className="logo-background">
                <Shield className="logo-icon" />
                <div className="logo-pulse"></div>
              </div>
              <div className="logo-text">
                <h1 className="project-title">
                  <span className="gradient-text">ChainGuard</span>
                  <Sparkles className="sparkle-icon" />
                </h1>
                <p className="project-subtitle">Decentralized AI Security Agent</p>
              </div>
            </div>
          </div>

          <div className="project-description">
            <h2 className="section-title">🛡️ Advanced Blockchain Security</h2>
            <p className="description-text">
              ChainGuard is a real-time AI-powered security dashboard built to protect DApps 
              running on the Internet Computer (ICP). It leverages machine learning to analyze 
              blockchain transactions, predict threats, and automatically respond to malicious 
              activity—ensuring trust, security, and transparency.
            </p>
          </div>

          {/* Features Carousel */}
          <div className="features-section">
            <h3 className="features-title">Key Features</h3>
            <div className="feature-carousel">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`feature-card ${index === currentFeature ? 'active' : ''}`}
                >
                  <div className="feature-icon">
                    <feature.icon className="icon" />
                  </div>
                  <div className="feature-content">
                    <h4 className="feature-title">{feature.title}</h4>
                    <p className="feature-description">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="tech-stack">
            <h3 className="tech-title">Built With</h3>
            <div className="tech-grid">
              {techStack.map((tech, index) => (
                <div 
                  key={index} 
                  className="tech-badge"
                  style={{ '--tech-color': tech.color }}
                >
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="team-section">
            <h3 className="team-title">Created By</h3>
            <div className="team-members">
              <div className="team-member">
                <div className="member-avatar">
                  <Users className="avatar-icon" />
                </div>
                <div className="member-info">
                  <h4 className="member-name">Pranav Marwaha</h4>
                  <p className="member-role">Lead Developer</p>
                </div>
              </div>
              <div className="team-member">
                <div className="member-avatar">
                  <Code className="avatar-icon" />
                </div>
                <div className="member-info">
                  <h4 className="member-name">Chinkal Patel</h4>
                  <p className="member-role">Co-Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Login */}
        <div className="login-panel">
          <div className="login-card">
            <div className="login-header">
              <div className="login-icon">
                <Lock className="icon" />
                <div className="icon-glow"></div>
              </div>
              <h2 className="login-title">Secure Access</h2>
              <p className="login-subtitle">
                Connect with Internet Identity for decentralized authentication
              </p>
            </div>

            {error && (
              <div className="error-message">
                <AlertTriangle className="error-icon" />
                <span>{error}</span>
              </div>
            )}

            <div className="login-form">
              <button
                onClick={onLogin}
                disabled={isLoading}
                className="login-button"
              >
                <div className="button-content">
                  {isLoading ? (
                    <>
                      <div className="loading-spinner"></div>
                      <span>Connecting...</span>
                    </>
                  ) : (
                    <>
                      <Wifi className="button-icon" />
                      <span>Connect with Internet Identity</span>
                      <ChevronRight className="arrow-icon" />
                    </>
                  )}
                </div>
                <div className="button-glow"></div>
              </button>

              <div className="security-features">
                <div className="security-item">
                  <CheckCircle className="check-icon" />
                  <span>Decentralized Authentication</span>
                </div>
                <div className="security-item">
                  <CheckCircle className="check-icon" />
                  <span>No Passwords Required</span>
                </div>
                <div className="security-item">
                  <CheckCircle className="check-icon" />
                  <span>Blockchain Secured</span>
                </div>
              </div>
            </div>

            <div className="contact-section">
              <p className="contact-text">Questions? Get in touch</p>
              <a 
                href="mailto:pranavmarwaha73@gmail.com" 
                className="contact-link"
              >
                <Mail className="contact-icon" />
                <span>pranavmarwaha73@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <Brain className="icon" />
              </div>
              <div className="stat-content">
                <div className="stat-number">92.3%</div>
                <div className="stat-label">AI Accuracy</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <Database className="icon" />
              </div>
              <div className="stat-content">
                <div className="stat-number">100%</div>
                <div className="stat-label">Decentralized</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <Zap className="icon" />
              </div>
              <div className="stat-content">
                <div className="stat-number">Real-time</div>
                <div className="stat-label">Protection</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;