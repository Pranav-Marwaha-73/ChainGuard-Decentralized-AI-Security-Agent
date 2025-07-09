import React, { useState, useEffect, useRef } from 'react';
import { Shield, Brain, Globe, Zap, Users, Code, Database, Cpu, BarChart3, Lock, CheckCircle, Star, Mail, Github, Linkedin, ArrowRight, Sparkles, Eye, Target, Layers, Rocket, Award, TrendingUp, Activity, Wifi, Server, Cloud, Hexagon } from 'lucide-react';
import './About.css';

const About = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState({});
  const containerRef = useRef(null);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Detection",
      description: "Advanced Random Forest Classifier with 92.3% accuracy for real-time threat detection and predictive analysis",
      color: "#667eea",
      gradient: "from-purple-500 to-blue-600",
      stats: "92.3% Accuracy"
    },
    {
      icon: Shield,
      title: "Real-time Protection",
      description: "Instant threat detection and automated countermeasures to protect your DApps with millisecond response times",
      color: "#f093fb",
      gradient: "from-pink-500 to-purple-600",
      stats: "<100ms Response"
    },
    {
      icon: Globe,
      title: "Decentralized Security",
      description: "Built on Internet Computer Protocol for trustless, transparent, and immutable security infrastructure",
      color: "#4facfe",
      gradient: "from-blue-500 to-cyan-500",
      stats: "100% Decentralized"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Comprehensive transaction visualization, security insights dashboard, and predictive threat modeling",
      color: "#00f2fe",
      gradient: "from-cyan-500 to-teal-500",
      stats: "Real-time Analytics"
    }
  ];

  const techStack = [
    { name: "React.js", description: "Modern UI Framework", icon: Code, color: "#61DAFB", category: "Frontend" },
    { name: "Rust", description: "Backend Smart Contracts", icon: Database, color: "#CE422B", category: "Backend" },
    { name: "Internet Computer", description: "Blockchain Platform", icon: Globe, color: "#29ABE2", category: "Blockchain" },
    { name: "Machine Learning", description: "AI Security Engine", icon: Brain, color: "#FF6B6B", category: "AI/ML" },
    { name: "Tailwind CSS", description: "Styling Framework", icon: Sparkles, color: "#06B6D4", category: "Frontend" },
    { name: "Python", description: "ML Model Training", icon: Cpu, color: "#3776AB", category: "AI/ML" }
  ];

  const stats = [
    { label: "AI Accuracy", value: "92.3%", icon: Brain, color: "#667eea" },
    { label: "Response Time", value: "<100ms", icon: Zap, color: "#f093fb" },
    { label: "Threats Blocked", value: "10K+", icon: Shield, color: "#4facfe" },
    { label: "DApps Protected", value: "50+", icon: Globe, color: "#00f2fe" }
  ];

  const workflowSteps = [
    {
      number: "01",
      title: "Transaction Analysis",
      description: "Users submit transaction data through our intuitive dashboard. Our AI analyzes action and value parameters using advanced machine learning algorithms.",
      icon: Eye,
      color: "#667eea"
    },
    {
      number: "02", 
      title: "Threat Detection",
      description: "The Random Forest Classifier processes the data and predicts whether the transaction is Safe or Malicious with industry-leading 92.3% accuracy.",
      icon: Target,
      color: "#f093fb"
    },
    {
      number: "03",
      title: "Automated Response",
      description: "If malicious activity is detected, ChainGuard automatically triggers countermeasures, blocks the transaction, and alerts administrators in real-time.",
      icon: Shield,
      color: "#4facfe"
    },
    {
      number: "04",
      title: "Logging & Analytics",
      description: "All transactions are logged in the decentralized backend with comprehensive analytics, security reporting, and threat intelligence.",
      icon: BarChart3,
      color: "#00f2fe"
    }
  ];

  const teamMembers = [
    {
      name: "Pranav Marwaha",
      role: "Lead Developer & AI Specialist",
      email: "pranavmarwaha73@gmail.com",
      description: "Full-stack developer specializing in blockchain security, machine learning, and decentralized systems architecture",
      avatar: Users,
      skills: ["React.js", "Machine Learning", "Blockchain", "Python"],
      achievements: ["92.3% AI Accuracy", "Real-time Protection", "Decentralized Architecture"]
    },
    {
      name: "Chinkal Patel",
      role: "Co-Developer & Blockchain Engineer",
      description: "Expert in smart contract development, Internet Computer Protocol, and decentralized security systems",
      avatar: Code,
      skills: ["Rust", "Smart Contracts", "ICP", "Security"],
      achievements: ["Smart Contract Security", "Decentralized Backend", "Threat Countermeasures"]
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="about-container" ref={containerRef}>
      {/* Animated Background */}
      <div className="cosmic-background">
        <div className="stars"></div>
        <div className="floating-shapes">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`shape shape-${i % 4}`}></div>
          ))}
        </div>
        <div className="gradient-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
          <div className="orb orb-4"></div>
        </div>
      </div>

      {/* Mouse Follower */}
      <div 
        className="mouse-follower"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      ></div>

      {/* Hero Section */}
      <div className="hero-section" id="hero" data-animate>
        <div className="hero-content">
          <div className="hero-badge">
            <Shield className="badge-icon" />
            <span>ChainGuard AI</span>
            <div className="badge-glow"></div>
          </div>
          
          <h1 className="hero-title">
            <span className="title-line">Decentralized AI</span>
            <span className="title-line gradient-text">Security Agent</span>
            <div className="title-decoration">
              <Sparkles className="sparkle-1" />
              <Sparkles className="sparkle-2" />
              <Sparkles className="sparkle-3" />
            </div>
          </h1>
          
          <p className="hero-description">
            Revolutionary real-time AI-powered security dashboard engineered to protect DApps 
            on the Internet Computer. Leveraging cutting-edge machine learning to analyze 
            blockchain transactions, predict sophisticated threats, and autonomously respond 
            to malicious activity with unprecedented accuracy and speed.
          </p>
          
          <div className="hero-stats">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="hero-stat"
                style={{ '--stat-color': stat.color, '--delay': `${index * 0.2}s` }}
              >
                <div className="stat-icon">
                  <stat.icon className="icon" />
                  <div className="icon-pulse"></div>
                </div>
                <div className="stat-content">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
                <div className="stat-glow"></div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="central-hub">
            <div className="hub-core">
              <Shield className="core-icon" />
              <div className="core-pulse"></div>
            </div>
            <div className="orbit-ring ring-1">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`orbit-node ${index === activeFeature ? 'active' : ''}`}
                  style={{ '--node-color': feature.color }}
                >
                  <feature.icon className="node-icon" />
                </div>
              ))}
            </div>
            <div className="orbit-ring ring-2">
              {techStack.map((tech, index) => (
                <div 
                  key={index}
                  className="orbit-node small"
                  style={{ '--node-color': tech.color }}
                >
                  <tech.icon className="node-icon" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section" id="features" data-animate>
        <div className="section-header">
          <div className="section-badge">
            <Rocket className="badge-icon" />
            <span>Core Features</span>
          </div>
          <h2 className="section-title">
            Next-Generation Security
            <span className="title-highlight">Capabilities</span>
          </h2>
          <p className="section-subtitle">
            Advanced security capabilities powered by cutting-edge artificial intelligence 
            and blockchain technology for unparalleled protection
          </p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`feature-card ${isVisible.features ? 'visible' : ''}`}
              style={{ 
                '--feature-color': feature.color,
                '--delay': `${index * 0.2}s`
              }}
              onMouseEnter={() => setActiveFeature(index)}
            >
              <div className="feature-header">
                <div className="feature-icon">
                  <feature.icon className="icon" />
                  <div className="icon-glow"></div>
                </div>
                <div className="feature-stats">{feature.stats}</div>
              </div>
              
              <div className="feature-content">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
              
              <div className="feature-footer">
                <div className="feature-arrow">
                  <ArrowRight className="arrow-icon" />
                </div>
              </div>
              
              <div className="feature-bg"></div>
              <div className="feature-border"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Workflow Section */}
      <div className="workflow-section" id="workflow" data-animate>
        <div className="section-header">
          <div className="section-badge">
            <Activity className="badge-icon" />
            <span>How It Works</span>
          </div>
          <h2 className="section-title">
            Intelligent Security
            <span className="title-highlight">Pipeline</span>
          </h2>
          <p className="section-subtitle">
            A comprehensive four-stage security pipeline from detection to protection, 
            engineered for maximum efficiency and reliability
          </p>
        </div>
        
        <div className="workflow-container">
          <div className="workflow-timeline">
            {workflowSteps.map((step, index) => (
              <div 
                key={index}
                className={`workflow-step ${isVisible.workflow ? 'visible' : ''}`}
                style={{ 
                  '--step-color': step.color,
                  '--delay': `${index * 0.3}s`
                }}
              >
                <div className="step-connector"></div>
                <div className="step-node">
                  <div className="step-number">{step.number}</div>
                  <div className="step-icon">
                    <step.icon className="icon" />
                  </div>
                  <div className="node-pulse"></div>
                </div>
                <div className="step-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
                <div className="step-glow"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="tech-section" id="tech" data-animate>
        <div className="section-header">
          <div className="section-badge">
            <Layers className="badge-icon" />
            <span>Technology Stack</span>
          </div>
          <h2 className="section-title">
            Cutting-Edge
            <span className="title-highlight">Technologies</span>
          </h2>
          <p className="section-subtitle">
            Built with modern, enterprise-grade technologies for maximum security, 
            performance, and scalability
          </p>
        </div>
        
        <div className="tech-grid">
          {techStack.map((tech, index) => (
            <div 
              key={index}
              className={`tech-card ${isVisible.tech ? 'visible' : ''}`}
              style={{ 
                '--tech-color': tech.color,
                '--delay': `${index * 0.15}s`
              }}
            >
              <div className="tech-header">
                <div className="tech-icon">
                  <tech.icon className="icon" />
                  <div className="icon-orbit"></div>
                </div>
                <div className="tech-category">{tech.category}</div>
              </div>
              
              <div className="tech-content">
                <h3 className="tech-name">{tech.name}</h3>
                <p className="tech-description">{tech.description}</p>
              </div>
              
              <div className="tech-effects">
                <div className="tech-glow"></div>
                <div className="tech-particles">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="particle"></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="team-section" id="team" data-animate>
        <div className="section-header">
          <div className="section-badge">
            <Award className="badge-icon" />
            <span>Meet the Team</span>
          </div>
          <h2 className="section-title">
            Brilliant Minds Behind
            <span className="title-highlight">ChainGuard</span>
          </h2>
          <p className="section-subtitle">
            The innovative team of experts who architected and developed 
            ChainGuard's revolutionary security solutions
          </p>
        </div>
        
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className={`team-card ${isVisible.team ? 'visible' : ''}`}
              style={{ '--delay': `${index * 0.3}s` }}
            >
              <div className="member-header">
                <div className="member-avatar">
                  <member.avatar className="avatar-icon" />
                  <div className="avatar-glow"></div>
                  <div className="avatar-ring"></div>
                </div>
                <div className="member-info">
                  <h3 className="member-name">{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                </div>
              </div>
              
              <p className="member-description">{member.description}</p>
              
              <div className="member-skills">
                <h4 className="skills-title">Expertise</h4>
                <div className="skills-list">
                  {member.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
              
              <div className="member-achievements">
                <h4 className="achievements-title">Key Contributions</h4>
                <div className="achievements-list">
                  {member.achievements.map((achievement, achIndex) => (
                    <div key={achIndex} className="achievement-item">
                      <CheckCircle className="check-icon" />
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {member.email && (
                <div className="member-contact">
                  <a href={`mailto:${member.email}`} className="contact-button">
                    <Mail className="contact-icon" />
                    <span>Get in Touch</span>
                    <ArrowRight className="arrow-icon" />
                  </a>
                </div>
              )}
              
              <div className="card-glow"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="contact-section" id="contact" data-animate>
        <div className="contact-container">
          <div className="contact-visual">
            <div className="contact-hub">
              <div className="hub-center">
                <Mail className="center-icon" />
                <div className="center-pulse"></div>
              </div>
              <div className="connection-lines">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className={`connection-line line-${i}`}></div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="contact-content">
            <div className="contact-header">
              <div className="section-badge">
                <Mail className="badge-icon" />
                <span>Get in Touch</span>
              </div>
              <h2 className="contact-title">
                Ready to Secure Your
                <span className="title-highlight">DApp?</span>
              </h2>
              <p className="contact-subtitle">
                Have questions about ChainGuard? Want to integrate our AI security 
                solutions? We'd love to discuss how we can protect your blockchain applications.
              </p>
            </div>
            
            <div className="contact-info">
              <div className="contact-item">
                <div className="item-icon">
                  <Mail className="icon" />
                </div>
                <div className="item-content">
                  <span className="item-label">Direct Contact</span>
                  <a href="mailto:pranavmarwaha73@gmail.com" className="item-value">
                    pranavmarwaha73@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="item-icon">
                  <Shield className="icon" />
                </div>
                <div className="item-content">
                  <span className="item-label">Project</span>
                  <span className="item-value">ChainGuard AI Security</span>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="item-icon">
                  <Globe className="icon" />
                </div>
                <div className="item-content">
                  <span className="item-label">Platform</span>
                  <span className="item-value">Internet Computer Protocol</span>
                </div>
              </div>
            </div>
            
            <div className="contact-cta">
              <a href="mailto:pranavmarwaha73@gmail.com" className="cta-button">
                <div className="button-content">
                  <Mail className="button-icon" />
                  <span>Start Conversation</span>
                  <ArrowRight className="arrow-icon" />
                </div>
                <div className="button-glow"></div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;