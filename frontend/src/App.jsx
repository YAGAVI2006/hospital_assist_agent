import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Departments from './components/Departments'
import Services from './components/Services'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import FloatingAIWidget from './components/FloatingAIWidget'
import Footer from './components/Footer'
import Chat from './components/Chat'
import './App.css'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [hospitalData, setHospitalData] = useState(null)

  // Apply theme to document root on mount and theme changes
  useEffect(() => {
    const root = document.documentElement
    if (isDarkMode) {
      root.setAttribute('data-theme', 'dark')
    } else {
      root.setAttribute('data-theme', 'light')
    }
  }, [isDarkMode])

  // Fetch hospital data from the backend
  useEffect(() => {
fetch("https://hospital-assist-agent.onrender.com/hospital-data")
      .then(res => {
        if (!res.ok) throw new Error(`Backend returned HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        setHospitalData(data);
        console.log('Successfully fetched hospital data from backend:', data);
      })
      .catch(err => console.error('Error fetching hospital data from backend:', err));
  }, [])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handleConsultAI = () => {
    const chatSection = document.getElementById('chat-section')
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleBookAppointment = () => {
    alert("Appointment Booking system will be implemented in a future phase. For now, you can consult our AI Assistant below!")
    handleConsultAI()
  }

  return (
    <div className="app-container">
      <Navbar 
        isDarkMode={isDarkMode} 
        onToggleTheme={toggleTheme} 
        onConsultAI={handleConsultAI} 
      />
      
      <main className="main-content">
        <Hero 
          onConsultAI={handleConsultAI} 
          onBookAppointment={handleBookAppointment} 
        />
        
        <About hospitalData={hospitalData} />
        
        <Departments hospitalData={hospitalData} />

        <Services hospitalData={hospitalData} />

        <FAQ hospitalData={hospitalData} />

        <Contact hospitalData={hospitalData} />

        {/* AI Chat Section */}
        <section id="chat-section" className="landing-section" style={{ padding: '60px 24px 100px', display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}>
          <div style={{ maxWidth: '800px', width: '100%', margin: '0 auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ textAlign: 'center' }}>
              <span className="hero-badge" style={{ margin: '0 auto 12px' }}>Interactive AI Desk</span>
              <h2 className="gradient-text" style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px', textAlign: 'center' }}>Hospital AI Assistant</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>Ask anything about {hospitalData?.hospitalName || 'our hospital'} and get an instant, intelligent answer.</p>
            </div>
            <div style={{ flex: 1, minHeight: '600px', border: '1px solid var(--border-color)', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', background: 'var(--bg-secondary)' }}>
              <Chat isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />
            </div>
          </div>
        </section>

        <Footer hospitalData={hospitalData} />
      </main>

      <FloatingAIWidget hospitalName={hospitalData?.hospitalName} />
    </div>
  )
}

export default App
