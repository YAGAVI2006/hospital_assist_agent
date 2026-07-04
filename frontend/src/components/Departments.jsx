import { useState, useMemo } from 'react';
import {
  Heart,
  Brain,
  Bone,
  Baby,
  Siren,
  ScanLine,
  Ribbon,
  CircleUserRound,
  Search,
  Calendar,
  GraduationCap,
  Stethoscope,
  Award,
  CheckCircle2,
  LayoutGrid,
  MessageSquare,
} from 'lucide-react';

/* ─── Department icon map ─────────────────────────────────── */
const DEPT_ICONS = {
  Cardiology: Heart,
  Neurology: Brain,
  Orthopedics: Bone,
  Pediatrics: Baby,
  'Emergency Medicine': Siren,
  Radiology: ScanLine,
  Oncology: Ribbon,
  'Obstetrics & Gynecology': CircleUserRound,
};

/* ─── Avatar gradient palettes per department ─────────────── */
const DEPT_GRADIENTS = {
  Cardiology: 'linear-gradient(135deg, #e11d48, #f97316)',
  Neurology: 'linear-gradient(135deg, #7c3aed, #6366f1)',
  Orthopedics: 'linear-gradient(135deg, #0369a1, #0ea5e9)',
  Pediatrics: 'linear-gradient(135deg, #059669, #10b981)',
  'Emergency Medicine': 'linear-gradient(135deg, #dc2626, #ef4444)',
  Radiology: 'linear-gradient(135deg, #0f766e, #14b8a6)',
  Oncology: 'linear-gradient(135deg, #b45309, #f59e0b)',
  'Obstetrics & Gynecology': 'linear-gradient(135deg, #be185d, #ec4899)',
  default: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
};

/* ─── Helpers ─────────────────────────────────────────────── */
function getInitials(name) {
  return name
    .replace('Dr. ', '')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function isAvailableToday(availableDays) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = days[new Date().getDay()];
  return availableDays.includes('Everyday') || availableDays.includes(today);
}

/* ─── Component ───────────────────────────────────────────── */
const Departments = ({ hospitalData }) => {
  const departments = useMemo(() => hospitalData?.departments || [], [hospitalData]);
  const doctors = useMemo(() => hospitalData?.doctors || [], [hospitalData]);

  const [selectedDept, setSelectedDept] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [animating, setAnimating] = useState(false);

  const activeDept = selectedDept || (departments.length > 0 ? departments[0] : '');

  /* ── Filter logic ── */
  const filteredDoctors = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return doctors.filter((doc) => {
      const matchesDept = !activeDept || activeDept === 'All' || doc.department === activeDept;
      const matchesSearch =
        !q ||
        doc.name.toLowerCase().includes(q) ||
        doc.department.toLowerCase().includes(q) ||
        doc.specialization.toLowerCase().includes(q);
      return matchesDept && matchesSearch;
    });
  }, [doctors, activeDept, searchQuery]);

  /* ── Department switch with animation ── */
  const switchDept = (dept) => {
    if (dept === activeDept) return;
    setAnimating(true);
    setTimeout(() => {
      setSelectedDept(dept);
      setAnimating(false);
    }, 220);
  };

  /* ── Consult AI handler ── */
  const handleConsult = (doc) => {
    const chatSection = document.getElementById('chat-section');
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const textarea = document.querySelector('.chat-input');
        if (textarea) {
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLTextAreaElement.prototype,
            'value'
          ).set;
          nativeInputValueSetter.call(
            textarea,
            `I would like information about ${doc.name} from the ${doc.department} department.`
          );
          textarea.dispatchEvent(new Event('input', { bubbles: true }));
          textarea.focus();
        }
      }, 900);
    }
  };

  /* Preserve the section's id in the DOM while data is loading so navbar
     scroll-links always find their target element. */
  if (!hospitalData) {
    return <section id="departments" style={{ padding: 0, margin: 0, height: 0, overflow: 'hidden' }} />;
  }

  return (
    <section id="departments" className="landing-section dept-section">
      <div className="section-container">

        {/* ── Header ── */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="hero-badge" style={{ margin: '0 auto 12px' }}>
            <Stethoscope size={14} /> Specialized Care
          </span>
          <h2 className="section-title">Departments &amp; Our Specialists</h2>
          <p className="section-subtitle" style={{ maxWidth: '600px', margin: '0 auto' }}>
            World-class departments staffed by expert specialists — find the right doctor for your needs.
          </p>
        </div>

        {/* ── Search Bar ── */}
        <div id="doctors" className="dept-search-wrapper">
          <Search size={18} className="dept-search-icon" />
          <input
            id="doctor-search"
            type="text"
            className="dept-search-input"
            placeholder="Search by name, department, or specialization…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* ── Main Layout ── */}
        <div className="dept-layout">

          {/* ── Sidebar ── */}
          <aside className="dept-sidebar">
            <h3 className="dept-sidebar-heading">
              <LayoutGrid size={18} /> Departments
            </h3>
            <div className="dept-list">

              {departments.map((dept) => {
                const Icon = DEPT_ICONS[dept] || Stethoscope;
                const count = doctors.filter((d) => d.department === dept).length;
                return (
                  <button
                    key={dept}
                    className={`dept-btn ${activeDept === dept ? 'active' : ''}`}
                    onClick={() => switchDept(dept)}
                  >
                    <span className="dept-btn-icon">
                      <Icon size={16} />
                    </span>
                    <span className="dept-btn-label">{dept}</span>
                    <span className="dept-btn-count">{count}</span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* ── Doctors Grid ── */}
          <div className="dept-content">
            {/* Sub-header */}
            <div className="dept-content-header">
              <div>
                <h3 className="dept-content-title">
                  {activeDept === 'All' ? 'All Specialists' : `${activeDept} Specialists`}
                </h3>
                <p className="dept-content-count">
                  {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} found
                </p>
              </div>
              {searchQuery && (
                <button className="dept-clear-btn" onClick={() => setSearchQuery('')}>
                  Clear search
                </button>
              )}
            </div>

            {/* Grid */}
            {filteredDoctors.length > 0 ? (
              <div className={`doctors-grid ${animating ? 'dept-fade-out' : 'dept-fade-in'}`}>
                {filteredDoctors.map((doc, index) => {
                  const available = isAvailableToday(doc.availableDays);
                  const gradient = DEPT_GRADIENTS[doc.department] || DEPT_GRADIENTS.default;
                  const DeptIcon = DEPT_ICONS[doc.department] || Stethoscope;

                  return (
                    <div key={index} className="doctor-card">
                      {/* Availability badge */}
                      <span className={`doc-availability-badge ${available ? 'available' : 'unavailable'}`}>
                        <CheckCircle2 size={12} />
                        {available ? 'Available Today' : 'Not Available Today'}
                      </span>

                      {/* Avatar */}
                      <div className="doctor-avatar" style={{ background: gradient }}>
                        {getInitials(doc.name)}
                      </div>

                      {/* Info */}
                      <div className="doctor-info">
                        <h4 className="doctor-name">{doc.name}</h4>

                        {/* Department badge */}
                        <span className="doc-dept-badge">
                          <DeptIcon size={12} /> {doc.department}
                        </span>

                        {/* Specialization */}
                        <p className="doctor-specialization">
                          <Stethoscope size={13} /> {doc.specialization}
                        </p>

                        {/* Qualification & Experience */}
                        <div className="doc-meta-row">
                          <span className="doc-meta-item">
                            <GraduationCap size={13} />
                            {doc.qualification || 'MD'}
                          </span>
                          <span className="doc-meta-item">
                            <Award size={13} />
                            {doc.experience ? `${doc.experience} yrs exp.` : '—'}
                          </span>
                        </div>

                        {/* Availability schedule */}
                        <div className="doctor-availability">
                          <Calendar size={13} />
                          <span>{doc.availableDays.join(', ')}</span>
                        </div>

                        {/* Consult Button */}
                        <button className="book-btn" onClick={() => handleConsult(doc)}>
                          <MessageSquare size={14} /> Consult AI
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="dept-empty">
                <Search size={40} style={{ opacity: 0.3, marginBottom: '12px' }} />
                <p>No specialists found for <strong>"{searchQuery}"</strong>.</p>
                <button className="dept-clear-btn" onClick={() => setSearchQuery('')}>
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Departments;
