import React from 'react';
import { Shield, Brain, Globe, Users, Mail, Github, Code, Database, Zap, BarChart3, Star, Award, Rocket, Target } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        {/* Enhanced Header with GitHub */}
        <div className="about-header">
          <div className="about-logo">
            <div className="about-logo-bg">
              <Shield className="about-logo-icon" />
              <div className="logo-pulse"></div>
            </div>
          </div>
          <h1 className="about-title">
            <span className="gradient-text">ChainGuard AI</span>
            <div className="title-decoration"></div>
          </h1>
          <p className="about-subtitle">
            🚀 Revolutionary Decentralized AI Security Agent protecting blockchain transactions with 
            <span className="highlight-text"> 92.3% accuracy</span>
          </p>
          
          {/* GitHub Stats */}
          <div className="github-section">
            <a 
              href="https://github.com/Pranav-Marwaha-73" 
              target="_blank" 
              rel="noopener noreferrer"
              className="github-link"
            >
              <Github className="github-icon" />
              <span>@Pranav-Marwaha-73</span>
              <div className="link-glow"></div>
            </a>
          </div>
        </div>

        {/* Enhanced Sections */}
        <div className="about-sections">
          {/* Project Overview with enhanced styling */}
          <section className="about-section featured-section">
            <h2 className="section-header">
              <Brain className="section-icon" />
              🎯 Project Mission
              <div className="header-line"></div>
            </h2>
            <div className="mission-content">
              <div className="mission-card">
                <div className="mission-icon">
                  <Rocket className="mission-rocket" />
                </div>
                <div className="mission-text">
                  <p className="section-text enhanced-text">
                    ChainGuard AI represents the <strong>future of blockchain security</strong>. Built on the 
                    Internet Computer Protocol, our revolutionary AI system doesn't just detect threats—it 
                    <em>predicts and prevents them</em> before they can cause damage.
                  </p>
                  <div className="achievement-badges">
                    <div className="badge badge-success">
                      <Award className="badge-icon" />
                      <span>92.3% AI Accuracy</span>
                    </div>
                    <div className="badge badge-primary">
                      <Target className="badge-icon" />
                      <span>Real-time Protection</span>
                    </div>
                    <div className="badge badge-warning">
                      <Zap className="badge-icon" />
                      <span>Instant Response</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Enhanced Key Features */}
          <section className="about-section">
            <h2 className="section-header">
              <Zap className="section-icon" />
              ⚡ Revolutionary Features
              <div className="header-line"></div>
            </h2>
            <div className="features-grid enhanced-grid">
              <div className="feature-item enhanced-feature">
                <div className="feature-icon-bg feature-icon-bg-green">
                  <Brain className="feature-icon feature-icon-green" />
                  <div className="icon-pulse green"></div>
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">🧠 AI-Powered Detection</h3>
                  <p className="feature-description">
                    Advanced Random Forest Classifier with <strong>92.3% accuracy</strong> - 
                    the highest in the industry for real-time blockchain threat detection
                  </p>
                  <div className="feature-stats">
                    <span className="stat-chip">Machine Learning</span>
                    <span className="stat-chip">Real-time</span>
                  </div>
                </div>
              </div>
              
              <div className="feature-item enhanced-feature">
                <div className="feature-icon-bg feature-icon-bg-blue">
                  <Shield className="feature-icon feature-icon-blue" />
                  <div className="icon-pulse blue"></div>
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">🛡️ Quantum-Level Security</h3>
                  <p className="feature-description">
                    Instant threat detection with automatic countermeasures. 
                    Our system responds in <strong>&lt;100ms</strong> to block malicious transactions
                  </p>
                  <div className="feature-stats">
                    <span className="stat-chip">Auto-Block</span>
                    <span className="stat-chip">Instant</span>
                  </div>
                </div>
              </div>
              
              <div className="feature-item enhanced-feature">
                <div className="feature-icon-bg feature-icon-bg-purple">
                  <Globe className="feature-icon feature-icon-purple" />
                  <div className="icon-pulse purple"></div>
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">🌐 Decentralized Architecture</h3>
                  <p className="feature-description">
                    Built on Internet Computer Protocol for maximum security, 
                    transparency, and <strong>100% uptime</strong> guarantee
                  </p>
                  <div className="feature-stats">
                    <span className="stat-chip">ICP Powered</span>
                    <span className="stat-chip">24/7</span>
                  </div>
                </div>
              </div>
              
              <div className="feature-item enhanced-feature">
                <div className="feature-icon-bg feature-icon-bg-orange">
                  <BarChart3 className="feature-icon feature-icon-orange" />
                  <div className="icon-pulse orange"></div>
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">📊 Advanced Analytics</h3>
                  <p className="feature-description">
                    Comprehensive transaction visualization with predictive analytics 
                    and <strong>real-time threat intelligence</strong>
                  </p>
                  <div className="feature-stats">
                    <span className="stat-chip">Predictive</span>
                    <span className="stat-chip">Visual</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Enhanced Technology Stack */}
          <section className="about-section">
            <h2 className="section-header">
              <Code className="section-icon" />
              🔧 Cutting-Edge Tech Stack
              <div className="header-line"></div>
            </h2>
            <div className="tech-grid enhanced-tech">
              {[
                { name: 'React.js', category: 'Frontend', level: 'Expert', color: '#61DAFB' },
                { name: 'Rust', category: 'Backend', level: 'Advanced', color: '#CE422B' },
                { name: 'Internet Computer', category: 'Blockchain', level: 'Expert', color: '#29ABE2' },
                { name: 'Machine Learning', category: 'AI/ML', level: 'Expert', color: '#FF6B6B' },
                { name: 'Tailwind CSS', category: 'Styling', level: 'Expert', color: '#06B6D4' },
                { name: 'Python', category: 'Data Science', level: 'Advanced', color: '#3776AB' }
              ].map((tech, index) => (
                <div key={index} className="tech-item enhanced-tech-item">
                  <div className="tech-header">
                    <div 
                      className="tech-dot" 
                      style={{ backgroundColor: tech.color }}
                    ></div>
                    <div className="tech-name">{tech.name}</div>
                  </div>
                  <div className="tech-category">{tech.category}</div>
                  <div className="tech-level">{tech.level}</div>
                  <div className="tech-glow" style={{ backgroundColor: `${tech.color}20` }}></div>
                </div>
              ))}
            </div>
          </section>

          {/* Enhanced Team */}
          <section className="about-section">
            <h2 className="section-header">
              <Users className="section-icon" />
              👥 Elite Development Team
              <div className="header-line"></div>
            </h2>
            <div className="team-grid enhanced-team">
              <div className="team-member enhanced-member">
                <div className="member-avatar member-avatar-blue">
                  <Users className="member-icon" />
                  <div className="avatar-glow blue"></div>
                </div>
                <div className="member-info">
                  <h3 className="member-name">Pranav Marwaha</h3>
                  <p className="member-role">🚀 Lead Developer & AI Architect</p>
                  <div className="member-skills">
                    <span className="skill-tag">AI/ML Expert</span>
                    <span className="skill-tag">Blockchain</span>
                    <span className="skill-tag">Full-Stack</span>
                  </div>
                  <div className="member-links">
                    <a 
                      href="mailto:pranavmarwaha73@gmail.com" 
                      className="member-email"
                    >
                      <Mail className="link-icon" />
                      pranavmarwaha73@gmail.com
                    </a>
                    <a 
                      href="https://github.com/Pranav-Marwaha-73" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="member-github"
                    >
                      <Github className="link-icon" />
                      GitHub Profile
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="team-member enhanced-member">
                <div className="member-avatar member-avatar-purple">
                  <Code className="member-icon" />
                  <div className="avatar-glow purple"></div>
                </div>
                <div className="member-info">
                  <h3 className="member-name">Chinkal Patel</h3>
                  <p className="member-role">🔒 Co-Developer & Security Engineer</p>
                  <div className="member-skills">
                    <span className="skill-tag">Security</span>
                    <span className="skill-tag">Backend</span>
                    <span className="skill-tag">DevOps</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Enhanced Statistics */}
          <section className="about-section stats-showcase">
            <h2 className="section-header">
              <Database className="section-icon" />
              📈 Impressive Statistics
              <div className="header-line"></div>
            </h2>
            <div className="stats-grid enhanced-stats">
              <div className="stat-item enhanced-stat">
                <div className="stat-icon stat-icon-blue">
                  <Brain className="stat-icon-inner" />
                </div>
                <div className="stat-value stat-value-blue">92.3%</div>
                <div className="stat-label">AI Accuracy Rate</div>
                <div className="stat-description">Industry Leading</div>
              </div>
              <div className="stat-item enhanced-stat">
                <div className="stat-icon stat-icon-green">
                  <Shield className="stat-icon-inner" />
                </div>
                <div className="stat-value stat-value-green">100%</div>
                <div className="stat-label">Decentralized</div>
                <div className="stat-description">Zero Downtime</div>
              </div>
              <div className="stat-item enhanced-stat">
                <div className="stat-icon stat-icon-purple">
                  <Zap className="stat-icon-inner" />
                </div>
                <div className="stat-value stat-value-purple">&lt;100ms</div>
                <div className="stat-label">Response Time</div>
                <div className="stat-description">Lightning Fast</div>
              </div>
              <div className="stat-item enhanced-stat">
                <div className="stat-icon stat-icon-orange">
                  <Target className="stat-icon-inner" />
                </div>
                <div className="stat-value stat-value-orange">24/7</div>
                <div className="stat-label">Protection</div>
                <div className="stat-description">Always Active</div>
              </div>
            </div>
          </section>

          {/* Enhanced Contact */}
          <section className="about-section contact-showcase">
            <h2 className="section-header">
              <Mail className="section-icon" />
              🤝 Let's Connect & Collaborate
              <div className="header-line"></div>
            </h2>
            <div className="contact-section">
              <p className="contact-text">
                Ready to revolutionize blockchain security? Join our mission to make DeFi safer for everyone!
              </p>
              <div className="contact-buttons">
                <a 
                  href="mailto:pranavmarwaha73@gmail.com"
                  className="contact-button contact-button-primary"
                >
                  <Mail className="contact-icon" />
                  <span>Email Collaboration</span>
                  <div className="button-glow"></div>
                </a>
                <a 
                  href="https://github.com/Pranav-Marwaha-73"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-button contact-button-secondary"
                >
                  <Github className="contact-icon" />
                  <span>GitHub Projects</span>
                  <div className="button-glow"></div>
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;