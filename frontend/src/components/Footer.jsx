import {
  Heart,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';

const Footer = ({ hospitalData }) => {
  const year = new Date().getFullYear();
  const name = hospitalData?.hospitalName || 'Starlight Medical Center';
  const phone = hospitalData?.contact?.phone;
  const email = hospitalData?.contact?.email;
  const address = hospitalData?.address;

  const quickLinks = [
    { label: 'About Us', href: '#about' },
    { label: 'Departments', href: '#departments' },
    { label: 'Our Services', href: '#services' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
    { label: 'Chat with AI', href: '#chat-section' },
  ];

  const handleScroll = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const socials = [
    {
      label: 'Facebook',
      href: '#',
      svg: (
        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      )
    },
    {
      label: 'Twitter',
      href: '#',
      svg: (
        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
      )
    },
    {
      label: 'Instagram',
      href: '#',
      svg: (
        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      )
    },
    {
      label: 'LinkedIn',
      href: '#',
      svg: (
        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      )
    }
  ];

  return (
    <footer className="site-footer">
      <div className="footer-inner">

        {/* ── Brand ── */}
        <div className="footer-brand">
          <div className="footer-logo">
            <Heart size={20} />
          </div>
          <div>
            <h3 className="footer-name">{name}</h3>
            <p className="footer-tagline">
              Compassionate care, world-class expertise. Your health is our mission.
            </p>
          </div>

          {/* Social icons */}
          <div className="footer-socials">
            {socials.map(({ label, href, svg }) => (
              <a key={label} href={href} className="footer-social-btn" aria-label={label} target="_blank" rel="noreferrer">
                {svg}
              </a>
            ))}
          </div>
        </div>

        {/* ── Quick Links ── */}
        <div className="footer-col">
          <h4 className="footer-col-title">Quick Links</h4>
          <ul className="footer-links">
            {quickLinks.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="footer-link"
                  onClick={(e) => handleScroll(e, href)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Contact Info ── */}
        <div className="footer-col">
          <h4 className="footer-col-title">Contact</h4>
          <div className="footer-contact-list">
            {phone && (
              <a href={`tel:${phone}`} className="footer-contact-item">
                <Phone size={14} />
                {phone}
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`} className="footer-contact-item">
                <Mail size={14} />
                {email}
              </a>
            )}
            {address && (
              <div className="footer-contact-item">
                <MapPin size={14} style={{ flexShrink: 0 }} />
                <span>
                  {address.street}, {address.city},<br />
                  {address.state} {address.zipCode}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── Emergency ── */}
        <div className="footer-col">
          <h4 className="footer-col-title">Emergency</h4>
          <div className="footer-emergency-box">
            <p className="footer-emergency-label">24/7 Emergency Helpline</p>
            <a
              href={`tel:${hospitalData?.emergency?.phone}`}
              className="footer-emergency-number"
            >
              {hospitalData?.emergency?.phone}
            </a>
            <p className="footer-emergency-sub">Always available — day or night</p>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="footer-bottom">
        <p>© {year} {name}. All rights reserved.</p>
        <p className="footer-bottom-right">
          Built with <Heart size={12} className="footer-heart" /> for better healthcare
        </p>
      </div>
    </footer>
  );
};

export default Footer;
