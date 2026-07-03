const Sidebar = () => {

  const quickInfoItems = [
    { icon: '🏥', label: 'Departments' },
    { icon: '👨‍⚕️', label: 'Doctors' },
    { icon: '🕐', label: 'OP Timings' },
    { icon: '🚨', label: 'Emergency' },
    { icon: '👥', label: 'Visiting Hours' },
    { icon: '💳', label: 'Insurance' },
    { icon: '📞', label: 'Contact Us' }
  ]

  return (
    <aside className="sidebar">
      {/* Logo Section */}
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">🏥</span>
          <div className="logo-text">
            <div className="logo-title">Starlight</div>
            <div className="logo-subtitle">Medical Center</div>
          </div>
        </div>
      </div>

      {/* Chat Section */}
      <div className="sidebar-chat">
        <button className="chat-button">
          <span className="chat-icon">💬</span>
          Chat
        </button>
      </div>

      {/* Quick Info Section */}
      <div className="quick-info">
        <h3 className="section-title">Quick Info</h3>
        <nav className="quick-info-list">
          {quickInfoItems.map((item, index) => (
            <button key={index} className="quick-info-item">
              <span className="quick-info-icon">{item.icon}</span>
              <span className="quick-info-label">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Emergency Section */}
      <div className="emergency-section">
        <div className="emergency-header">
          <span className="emergency-icon">🚨</span>
          Emergency
        </div>
        <div className="emergency-info">
          <p className="emergency-label">24/7 Service</p>
          <p className="emergency-phone">1800 123 4567</p>
        </div>
      </div>

    </aside>
  )
}

export default Sidebar
