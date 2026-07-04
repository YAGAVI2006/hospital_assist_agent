import { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar, Sun, Moon, HeartPulse } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Departments', href: '#departments' },
  { name: 'Doctors', href: '#doctors' },
  { name: 'Services', href: '#services' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = ({ isDarkMode, onToggleTheme, onConsultAI }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  // Scroll spy for active link and hide/show navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // Handle visibility
      if (currentScrollPos < 50) {
        setVisible(true);
      } else {
        // Show if scrolling up, hide if scrolling down
        setVisible(prevScrollPos > currentScrollPos);
      }
      setPrevScrollPos(currentScrollPos);

      // Scroll spy
      const scrollPosition = window.scrollY + 120;
      for (const link of navLinks) {
        const section = document.querySelector(link.href);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(link.href.replace('#', ''));
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const offset = 80; // height of navbar
      const elementPosition = targetElement.offsetTop;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(href.replace('#', ''));
    }
  };

  return (
    <motion.nav
      className={`navbar ${visible ? 'navbar-visible' : 'navbar-hidden'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-container">
        {/* Logo */}
        <a href="#home" className="navbar-logo" onClick={(e) => handleLinkClick(e, '#home')}>
          <div className="navbar-logo-icon">
            <HeartPulse className="pulse-icon" size={24} />
          </div>
          <div className="navbar-logo-text">
            <span className="navbar-title">Starlight</span>
            <span className="navbar-subtitle">Medical Center</span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="navbar-desktop-menu">
          <ul className="navbar-links">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={`navbar-link ${activeSection === link.href.replace('#', '') ? 'active' : ''}`}
                  onClick={(e) => handleLinkClick(e, link.href)}
                >
                  {link.name}
                  {activeSection === link.href.replace('#', '') && (
                    <motion.span
                      className="active-indicator"
                      layoutId="activeIndicator"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop Actions */}
        <div className="navbar-actions">
          <button className="theme-toggle" onClick={onToggleTheme} aria-label="Toggle theme">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <a href="tel:+12175550999" className="emergency-call-btn" title="Emergency 24/7 Call">
            <Phone size={16} />
            <span>24/7 Helpline</span>
          </a>

          <button className="book-appointment-btn" onClick={onConsultAI}>
            <Calendar size={16} />
            <span>Consult AI</span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="navbar-mobile-toggle" 
          onClick={() => setIsOpen(!isOpen)} 
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="navbar-mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="navbar-mobile-links">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`navbar-mobile-link ${activeSection === link.href.replace('#', '') ? 'active' : ''}`}
                    onClick={(e) => handleLinkClick(e, link.href)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li className="mobile-actions-divider"></li>
              <li className="navbar-mobile-action-items">
                <button className="mobile-action-btn theme" onClick={onToggleTheme}>
                  {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                  <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
                <a href="tel:+12175550999" className="mobile-action-btn emergency">
                  <Phone size={18} />
                  <span>Helpline: +1 (217) 555-0999</span>
                </a>
                <button className="mobile-action-btn appointment" onClick={() => { setIsOpen(false); onConsultAI(); }}>
                  <Calendar size={18} />
                  <span>Consult AI Assistant</span>
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
