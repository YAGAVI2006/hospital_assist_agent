import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Siren,
  ExternalLink,
  MessageCircle,
  Zap,
} from 'lucide-react';



function buildDirectionsUrl(address) {
  if (!address) return '#';
  const query = encodeURIComponent(
    `${address.street}, ${address.city}, ${address.state} ${address.zipCode}, ${address.country}`
  );
  return `https://www.google.com/maps/dir/?api=1&destination=${query}`;
}

/* ─── Contact Card sub-component ────────────────────────────── */
const ContactCard = ({ icon: Icon, gradient, title, children }) => (
  <div className="contact-card">
    <div className="contact-card-icon" style={{ background: gradient }}>
      <Icon size={20} color="white" />
    </div>
    <div className="contact-card-body">
      <p className="contact-card-title">{title}</p>
      {children}
    </div>
  </div>
);

/* ─── Main Contact component ─────────────────────────────────── */
const Contact = ({ hospitalData }) => {
  if (!hospitalData) {
    return <section id="contact" style={{ padding: 0, margin: 0, height: 0, overflow: 'hidden' }} />;
  }

  const { address, contact, opTimings, emergency, hospitalName } = hospitalData;
  const directionsUrl = buildDirectionsUrl(address);

  // Derive WhatsApp link from main phone (strip non-digits)
  const whatsappNumber = contact?.phone?.replace(/\D/g, '');
  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=Hello%2C%20I%20have%20a%20query%20about%20${encodeURIComponent(hospitalName || 'your hospital')}.`
    : null;

  return (
    <section id="contact" className="landing-section contact-section">
      <div className="section-container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="hero-badge" style={{ margin: '0 auto 12px' }}>
            <MapPin size={14} /> Reach Us
          </span>
          <h2 className="section-title">Contact & Location</h2>
          <p className="section-subtitle" style={{ maxWidth: '560px', margin: '0 auto' }}>
            We're here when you need us. Reach out through any channel that works best for you.
          </p>
        </div>

        <div className="contact-grid">
          {/* Address */}
          <ContactCard
            icon={MapPin}
            gradient="linear-gradient(135deg, #6366f1, #8b5cf6)"
            title="Our Location"
          >
            <p className="contact-card-text">
              {address?.street}<br />
              {address?.city}, {address?.state} {address?.zipCode}<br />
              {address?.country}
            </p>
            <a href={directionsUrl} target="_blank" rel="noreferrer" className="contact-link">
              <ExternalLink size={13} /> Open in Google Maps
            </a>
          </ContactCard>

          {/* Phone */}
          <ContactCard
            icon={Phone}
            gradient="linear-gradient(135deg, #0369a1, #0ea5e9)"
            title="Phone"
          >
            <a href={`tel:${contact?.phone}`} className="contact-card-text contact-link-plain">
              {contact?.phone}
            </a>
            <p className="contact-card-label">Main Reception Line</p>
          </ContactCard>

          {/* Email */}
          <ContactCard
            icon={Mail}
            gradient="linear-gradient(135deg, #059669, #10b981)"
            title="Email"
          >
            <a href={`mailto:${contact?.email}`} className="contact-card-text contact-link-plain">
              {contact?.email}
            </a>
            <p className="contact-card-label">We respond within 24 hours</p>
          </ContactCard>

          {/* Operating Hours */}
          <ContactCard
            icon={Clock}
            gradient="linear-gradient(135deg, #b45309, #f59e0b)"
            title="Operating Hours"
          >
            <div className="contact-timings">
              <div className="contact-timing-row">
                <span>Mon – Fri</span>
                <span>{opTimings?.weekdays}</span>
              </div>
              <div className="contact-timing-row">
                <span>Saturday</span>
                <span>{opTimings?.saturday}</span>
              </div>
              <div className="contact-timing-row">
                <span>Sunday</span>
                <span>{opTimings?.sunday}</span>
              </div>
            </div>
          </ContactCard>

          {/* Emergency */}
          {emergency?.available && (
            <ContactCard
              icon={Siren}
              gradient="linear-gradient(135deg, #dc2626, #ef4444)"
              title="Emergency"
            >
              <a href={`tel:${emergency?.phone}`} className="contact-card-text contact-link-plain emergency-phone-link">
                {emergency?.phone}
              </a>
              <p className="contact-card-label">
                {emergency?.open24Hours ? '24 / 7 — Always Open' : 'Emergency Line'}
              </p>
            </ContactCard>
          )}
        </div>

        {/* Quick response channels */}
        <div className="contact-quick-channels" style={{ justifyContent: 'center', marginTop: '32px' }}>
          {whatsappUrl && (
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="quick-channel-btn whatsapp" style={{ maxWidth: '280px' }}>
              <MessageCircle size={16} /> WhatsApp
            </a>
          )}
          <a href={`tel:${emergency?.phone || contact?.phone}`} className="quick-channel-btn emergency" style={{ maxWidth: '280px' }}>
            <Zap size={16} /> Emergency Call
          </a>
        </div>
      </div>
    </section>

  );
};

export default Contact;
