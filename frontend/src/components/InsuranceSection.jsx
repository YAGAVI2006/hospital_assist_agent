import { Shield, CheckCircle2, MessageSquare, HelpCircle } from 'lucide-react';

/* ─── Cashless support map ──────────────────────────────────── */
const CASHLESS_MAP = {
  Aetna: true,
  'Blue Cross Blue Shield': true,
  Cigna: true,
  UnitedHealthcare: true,
  Humana: false,
  Anthem: true,
  Medicare: true,
  Medicaid: true,
};

/* ─── InsuranceCard sub-component ─────────────────────────── */
const InsuranceCard = ({ name }) => {
  const cashless = CASHLESS_MAP[name] ?? false;

  return (
    <div className="insurance-card">
      <div className="insurance-card-icon">
        <Shield size={22} />
      </div>
      <div className="insurance-card-info">
        <p className="insurance-card-name">{name}</p>
        <span className={`insurance-cashless-badge ${cashless ? 'yes' : 'no'}`}>
          <CheckCircle2 size={11} />
          {cashless ? 'Cashless Available' : 'Reimbursement'}
        </span>
      </div>
    </div>
  );
};

/* ─── InsuranceSection component ───────────────────────────── */
const InsuranceSection = ({ providers, onAskAI }) => {
  if (!providers || providers.length === 0) return null;

  return (
    <div className="insurance-section">
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span className="hero-badge" style={{ margin: '0 auto 12px' }}>
          <Shield size={14} /> Coverage
        </span>
        <h2 className="section-title">Insurance Partners</h2>
        <p className="section-subtitle" style={{ maxWidth: '560px', margin: '0 auto' }}>
          We accept a wide range of national insurance plans. Cashless facility available for most major providers.
        </p>
      </div>

      <div className="insurance-grid">
        {providers.map((p, i) => (
          <InsuranceCard key={i} name={p} />
        ))}
      </div>

      {/* CTA */}
      <div className="insurance-cta">
        <HelpCircle size={20} style={{ flexShrink: 0 }} />
        <div>
          <p className="insurance-cta-text">Don't see your insurance provider listed?</p>
          <button
            className="insurance-cta-btn"
            onClick={() => onAskAI("Which insurance providers are accepted at Starlight Medical Center, and is cashless facility available?")}
          >
            <MessageSquare size={14} /> Ask AI about Coverage
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsuranceSection;
