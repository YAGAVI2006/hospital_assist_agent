import { motion } from 'framer-motion';
import { ArrowRight, Bot, Activity, ShieldCheck, Award, HeartHandshake, Sparkles } from 'lucide-react';

const Hero = ({ onConsultAI, onBookAppointment }) => {
  const stats = [
    { number: '24/7', label: 'Emergency Care', icon: <Activity className="stat-icon-svg text-red-500" size={20} /> },
    { number: '50+', label: 'Specialists', icon: <Award className="stat-icon-svg text-blue-500" size={20} /> },
    { number: '10k+', label: 'Happy Patients', icon: <HeartHandshake className="stat-icon-svg text-emerald-500" size={20} /> },
    { number: '20+', label: 'Departments', icon: <ShieldCheck className="stat-icon-svg text-purple-500" size={20} /> }
  ];

  return (
    <section id="home" className="hero-section">
      {/* Premium Background Elements */}
      <div className="hero-bg-shapes">
        <div className="shape-blur shape-1"></div>
        <div className="shape-blur shape-2"></div>
        <div className="shape-blur shape-3"></div>
        <div className="hero-grid-pattern"></div>
      </div>

      <div className="hero-container">
        {/* Left Column: Heading & Content */}
        <div className="hero-content">
          <motion.div 
            className="hero-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles size={14} className="hero-badge-icon" />
            <span>Starlight Medical Center • Trusted Healthcare</span>
          </motion.div>

          <motion.h1
            className="hero-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Compassionate <span className="gradient-text">Healthcare</span> for Every Family
          </motion.h1>

          <motion.p
            className="hero-subtext"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            At Starlight, we combine cutting-edge medical technologies with warm, empathetic care. Discover advanced treatments, expert specialists, and our 24/7 smart assistant designed to help you navigate your wellness journey.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button className="btn-primary hero-btn" onClick={onBookAppointment}>
              <span>Book Appointment</span>
              <ArrowRight size={18} />
            </button>
            <button className="btn-secondary hero-btn" onClick={onConsultAI}>
              <Bot size={18} />
              <span>Consult AI Assistant</span>
            </button>
          </motion.div>

          {/* Stats Cards */}
          <div className="hero-stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="hero-stat-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5, boxShadow: 'var(--shadow-md)' }}
              >
                <div className="hero-stat-icon-wrapper">
                  {stat.icon}
                </div>
                <div className="hero-stat-info">
                  <h3 className="hero-stat-number">{stat.number}</h3>
                  <p className="hero-stat-label">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Premium Visual / Illustration */}
        <div className="hero-visual-wrapper">
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Elegant Healthcare Interactive Dashboard UI Graphic */}
            <div className="medical-dashboard-graphic">
              {/* Central Glowing Pulse Circle */}
              <div className="pulse-circle-container">
                <div className="pulse-ring ring-1"></div>
                <div className="pulse-ring ring-2"></div>
                <div className="pulse-ring ring-3"></div>
                <div className="central-glow">
                  <HeartPulse className="pulse-heart-icon" size={48} />
                </div>
              </div>

              {/* Floating Dashboard Card 1: Vitals */}
              <motion.div 
                className="floating-card card-vitals"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                <div className="card-header-small">
                  <span className="dot-glowing green"></span>
                  <span className="card-tag">Live Status</span>
                </div>
                <div className="card-vital-metrics">
                  <span className="metric-title">Heart Rate</span>
                  <div className="metric-val">
                    <span className="num text-emerald-500">72</span>
                    <span className="unit">BPM</span>
                  </div>
                  {/* Heartbeat EKG wave simulation */}
                  <div className="ekg-container">
                    <svg viewBox="0 0 100 30" className="ekg-svg">
                      <path 
                        d="M0,15 L20,15 L25,5 L30,25 L35,15 L50,15 L55,0 L60,30 L65,15 L80,15 L85,10 L90,20 L100,15" 
                        fill="none" 
                        stroke="var(--success-color)" 
                        strokeWidth="2"
                        className="ekg-path"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>

              {/* Floating Dashboard Card 2: Doctor Appointment */}
              <motion.div 
                className="floating-card card-doctor"
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
              >
                <div className="doctor-card-info">
                  <div className="doctor-avatar-placeholder">
                    <span>👩‍⚕️</span>
                  </div>
                  <div className="doctor-text-info">
                    <h4>Dr. Maya Patel</h4>
                    <p>Cardiology Expert</p>
                  </div>
                </div>
                <div className="doctor-badge-status">
                  <span>Available Today</span>
                </div>
              </motion.div>

              {/* Floating Dashboard Card 3: Quick AI Diagnostics */}
              <motion.div 
                className="floating-card card-ai"
                animate={{ x: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 1 }}
              >
                <div className="ai-chat-bubble-mini">
                  <Bot size={16} className="text-purple-500" />
                  <span className="bubble-text">Ask me anything about Starlight...</span>
                </div>
                <div className="ai-typing-glow">
                  <span>Smart AI Assistant Active</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Simple helper icon
const HeartPulse = ({ className, size }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    <path d="M3.22 12H9.5l1.5-5 2 10 1.5-5h5.78" />
  </svg>
);

export default Hero;
