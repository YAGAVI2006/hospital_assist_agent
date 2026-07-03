import {
  Siren,
  Stethoscope,
  BedDouble,
  ScanLine,
  FlaskConical,
  Heart,
  Dumbbell,
  Pill,
  Baby,
  ShoppingBag,
  MessageSquare,
  CheckCircle,
} from 'lucide-react';

/* ─── Service metadata ──────────────────────────────────────── */
const SERVICE_META = {
  '24/7 Emergency Care': {
    icon: Siren,
    gradient: 'linear-gradient(135deg, #dc2626, #ef4444)',
    tagline: 'Immediate care when every second counts.',
    bullets: ['Round-the-clock trauma response', 'Dedicated rapid triage team', 'Advanced life-support units'],
  },
  'Outpatient Consultations': {
    icon: Stethoscope,
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    tagline: 'Expert specialist visits without admission.',
    bullets: ['Same-day appointments available', 'Multi-specialty OPD clinics', 'Follow-up & teleconsult options'],
  },
  'Inpatient Care': {
    icon: BedDouble,
    gradient: 'linear-gradient(135deg, #0369a1, #0ea5e9)',
    tagline: 'Comprehensive care during your hospital stay.',
    bullets: ['Private & semi-private rooms', '24/7 nursing supervision', 'Integrated care teams'],
  },
  'Diagnostic Imaging (X-ray, MRI, CT)': {
    icon: ScanLine,
    gradient: 'linear-gradient(135deg, #0f766e, #14b8a6)',
    tagline: 'Precision imaging for accurate diagnosis.',
    bullets: ['3T MRI & multi-slice CT scanners', 'Same-day radiology reports', 'Digital X-ray & ultrasound'],
  },
  'Laboratory Services': {
    icon: FlaskConical,
    gradient: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
    tagline: 'Fast, reliable diagnostic testing.',
    bullets: ['NABL-accredited pathology lab', 'Rapid turnaround for critical tests', 'Home sample collection available'],
  },
  'Cardiac Catheterization': {
    icon: Heart,
    gradient: 'linear-gradient(135deg, #e11d48, #f97316)',
    tagline: 'Minimally invasive heart diagnostics & treatment.',
    bullets: ['State-of-the-art cath lab', 'Angioplasty & stenting', 'Expert interventional cardiologists'],
  },
  'Physical Therapy': {
    icon: Dumbbell,
    gradient: 'linear-gradient(135deg, #065f46, #10b981)',
    tagline: 'Restore movement, strength, and quality of life.',
    bullets: ['Personalised rehab programs', 'Sports injury recovery', 'Post-surgical physiotherapy'],
  },
  'Chemotherapy': {
    icon: Pill,
    gradient: 'linear-gradient(135deg, #b45309, #f59e0b)',
    tagline: 'Advanced oncology treatment with compassionate care.',
    bullets: ['Day-care chemo infusion centre', 'Dedicated oncology nursing', 'Supportive & palliative care'],
  },
  'Maternity and Newborn Care': {
    icon: Baby,
    gradient: 'linear-gradient(135deg, #be185d, #ec4899)',
    tagline: 'Safe, supportive care for mother and baby.',
    bullets: ['Natural & C-section delivery suites', 'NICU level III support', 'Antenatal & postnatal classes'],
  },
  'Pharmacy Services': {
    icon: ShoppingBag,
    gradient: 'linear-gradient(135deg, #1d4ed8, #60a5fa)',
    tagline: 'On-site dispensing and medication counselling.',
    bullets: ['24/7 in-hospital pharmacy', 'Generic & branded medications', 'Pharmacist counselling on discharge'],
  },
};

/* ─── ServiceCard sub-component ────────────────────────────── */
const ServiceCard = ({ service, index, onAskAI }) => {
  const meta = SERVICE_META[service] || {
    icon: Stethoscope,
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    tagline: 'Providing quality healthcare services.',
    bullets: ['Expert care team', 'Modern equipment', 'Patient-first approach'],
  };

  const Icon = meta.icon;

  return (
    <div
      className="service-card"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="service-icon-wrap" style={{ background: meta.gradient }}>
        <Icon size={26} color="white" />
      </div>

      <div className="service-card-body">
        <h3 className="service-card-title">{service}</h3>
        <p className="service-card-tagline">{meta.tagline}</p>

        <ul className="service-bullets">
          {meta.bullets.map((b, i) => (
            <li key={i}>
              <CheckCircle size={13} className="service-bullet-icon" />
              {b}
            </li>
          ))}
        </ul>
      </div>

      <button className="service-ask-btn" onClick={() => onAskAI(service)}>
        <MessageSquare size={14} /> Ask AI
      </button>
    </div>
  );
};

export default ServiceCard;
