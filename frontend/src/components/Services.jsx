import {
  Activity,
  Users,
  LayoutGrid,
  Siren,
  HeartPulse,
  PhoneCall,
} from 'lucide-react';
import ServiceCard from './ServiceCard';
import InsuranceSection from './InsuranceSection';

/* ─── Statistics strip data ─────────────────────────────────── */
const buildStats = (hospitalData) => [
  {
    icon: Users,
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    value: hospitalData?.doctors?.length ? `${hospitalData.doctors.length}+` : '8+',
    label: 'Specialist Doctors',
  },
  {
    icon: LayoutGrid,
    gradient: 'linear-gradient(135deg, #0369a1, #0ea5e9)',
    value: hospitalData?.departments?.length ? `${hospitalData.departments.length}` : '8',
    label: 'Medical Departments',
  },
  {
    icon: Siren,
    gradient: 'linear-gradient(135deg, #dc2626, #ef4444)',
    value: '24/7',
    label: 'Emergency Care',
  },
  {
    icon: HeartPulse,
    gradient: 'linear-gradient(135deg, #059669, #10b981)',
    value: '10K+',
    label: 'Happy Patients',
  },
];

/* ─── Consult AI helper ─────────────────────────────────────── */
function scrollAndFillChat(message) {
  const chatSection = document.getElementById('chat-section');
  if (chatSection) {
    chatSection.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      const textarea = document.querySelector('.chat-input');
      if (textarea) {
        const nativeSet = Object.getOwnPropertyDescriptor(
          window.HTMLTextAreaElement.prototype,
          'value'
        ).set;
        nativeSet.call(textarea, message);
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
        textarea.focus();
      }
    }, 900);
  }
}

/* ─── Main Services component ───────────────────────────────── */
const Services = ({ hospitalData }) => {
  const services = hospitalData?.services || [];
  const insuranceProviders = hospitalData?.insuranceProvidersAccepted || [];
  const stats = buildStats(hospitalData);

  if (!hospitalData) {
    return (
      <>
        <section id="services" style={{ padding: 0, margin: 0, height: 0, overflow: 'hidden' }} />
        <section id="insurance" style={{ padding: 0, margin: 0, height: 0, overflow: 'hidden' }} />
      </>
    );
  }

  const handleAskAI = (service) => {
    scrollAndFillChat(`Tell me more about the ${service} at ${hospitalData.hospitalName || 'your hospital'}.`);
  };

  const handleInsuranceAI = (message) => {
    scrollAndFillChat(message);
  };

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          Statistics Strip
          ═══════════════════════════════════════════════════════ */}
      <section className="stats-strip">
        <div className="stats-strip-inner">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="stat-item" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="stat-icon-wrap" style={{ background: stat.gradient }}>
                  <Icon size={22} color="white" />
                </div>
                <div>
                  <p className="stat-value">{stat.value}</p>
                  <p className="stat-label">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          Our Services
          ═══════════════════════════════════════════════════════ */}
      <section id="services" className="landing-section services-section">
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="hero-badge" style={{ margin: '0 auto 12px' }}>
              <Activity size={14} /> What We Offer
            </span>
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle" style={{ maxWidth: '600px', margin: '0 auto' }}>
              From emergency care to specialised treatment — world-class healthcare services delivered with compassion and precision.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service, i) => (
              <ServiceCard
                key={i}
                service={service}
                index={i}
                onAskAI={handleAskAI}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          Emergency Care Banner
          ═══════════════════════════════════════════════════════ */}
      <section className="emergency-banner">
        <div className="emergency-banner-inner">
          <div className="emergency-banner-pulse">
            <Siren size={36} />
          </div>
          <div className="emergency-banner-text">
            <h3>24/7 Emergency Care — Always Ready</h3>
            <p>
              Our emergency team is on standby around the clock.
              Immediate triage, advanced life support, and specialist escalation — all within minutes.
            </p>
          </div>
          <a
            href={`tel:${hospitalData?.emergency?.phone || '+12175550999'}`}
            className="emergency-banner-btn"
          >
            <PhoneCall size={16} />
            {hospitalData?.emergency?.phone || '+1 (217) 555-0999'}
          </a>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          Insurance Partners
          ═══════════════════════════════════════════════════════ */}
      <section id="insurance" className="landing-section insurance-outer-section">
        <div className="section-container">
          <InsuranceSection
            providers={insuranceProviders}
            onAskAI={handleInsuranceAI}
          />
        </div>
      </section>
    </>
  );
};

export default Services;
