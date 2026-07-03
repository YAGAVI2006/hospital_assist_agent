import { useState, useMemo } from 'react';
import {
  ChevronDown,
  HelpCircle,
  Search,
  MessageSquare,
  Tag,
  ChevronRight,
  List,
} from 'lucide-react';

/* ─── Derive a category from FAQ question text ──────────────── */
function deriveCategory(question) {
  const q = question.toLowerCase();
  if (q.includes('appointment') || q.includes('schedule') || q.includes('book')) return 'Appointments';
  if (q.includes('telehealth') || q.includes('virtual') || q.includes('online')) return 'Telehealth';
  if (q.includes('document') || q.includes('bring') || q.includes('first visit')) return 'Visiting';
  if (q.includes('insurance') || q.includes('out-of-state') || q.includes('plan') || q.includes('coverage')) return 'Insurance & Billing';
  if (q.includes('icu') || q.includes('emergency') || q.includes('visit a patient')) return 'Patient Visits';
  return 'General';
}

/* ─── Scroll-and-fill helper ────────────────────────────────── */
function askAIAbout(question) {
  const chatSection = document.getElementById('chat-section');
  if (chatSection) {
    chatSection.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      const textarea = document.querySelector('.chat-input');
      if (textarea) {
        const nativeSet = Object.getOwnPropertyDescriptor(
          window.HTMLTextAreaElement.prototype, 'value'
        ).set;
        nativeSet.call(textarea, question);
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
        textarea.focus();
      }
    }, 900);
  }
}

/* ─── Single FAQ item ───────────────────────────────────────── */
const FAQItem = ({ faq, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <button
        className="faq-question"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="faq-question-text">{faq.question}</span>
        <ChevronDown size={18} className={`faq-chevron ${open ? 'rotated' : ''}`} />
      </button>

      <div className={`faq-answer-wrapper ${open ? 'expanded' : ''}`}>
        <div className="faq-answer">
          <p>{faq.answer}</p>
          <button
            className="faq-ask-btn"
            onClick={() => askAIAbout(faq.question)}
          >
            <MessageSquare size={13} /> Ask AI for more details
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Main FAQ component ────────────────────────────────────── */
const FAQ = ({ hospitalData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAll, setShowAll] = useState(false);

  const faqs = hospitalData?.faqs || [];

  // Build categories
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(faqs.map(f => deriveCategory(f.question)))];
    return cats;
  }, [faqs]);

  // Filter FAQs
  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return faqs.filter(faq => {
      const matchesCat = activeCategory === 'All' || deriveCategory(faq.question) === activeCategory;
      const matchesSearch = !q || faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [faqs, activeCategory, searchQuery]);

  const PREVIEW_COUNT = 3;
  const displayed = showAll || searchQuery ? filtered : filtered.slice(0, PREVIEW_COUNT);
  const hasMore = filtered.length > PREVIEW_COUNT && !showAll && !searchQuery;

  if (!hospitalData) return null;

  return (
    <section id="faq" className="landing-section faq-section">
      <div className="section-container" style={{ maxWidth: '860px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="hero-badge" style={{ margin: '0 auto 12px' }}>
            <HelpCircle size={14} /> Got Questions?
          </span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle" style={{ maxWidth: '560px', margin: '0 auto' }}>
            Find quick answers to common questions, or use our AI assistant for personalised help.
          </p>
        </div>

        {/* Search */}
        <div className="faq-search-wrapper">
          <Search size={17} className="faq-search-icon" />
          <input
            type="text"
            className="faq-search-input"
            placeholder="Search questions…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category tabs */}
        <div className="faq-category-tabs">
          {categories.map(cat => (
            <button
              key={cat}
              className={`faq-cat-tab ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => { setActiveCategory(cat); setShowAll(false); }}
            >
              {cat === 'All' ? <List size={13} /> : <Tag size={13} />}
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="faq-list">
          {displayed.length > 0 ? (
            displayed.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))
          ) : (
            <div className="faq-empty">
              <HelpCircle size={36} style={{ opacity: 0.3, marginBottom: 10 }} />
              <p>No questions found for <strong>"{searchQuery}"</strong>.</p>
              <button className="faq-ask-btn" style={{ marginTop: 4 }} onClick={() => askAIAbout(searchQuery)}>
                <MessageSquare size={13} /> Ask AI directly
              </button>
            </div>
          )}
        </div>

        {/* View All / collapse */}
        {hasMore && (
          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <button className="faq-view-all-btn" onClick={() => setShowAll(true)}>
              View all {filtered.length} FAQs <ChevronRight size={15} />
            </button>
          </div>
        )}
        {showAll && filtered.length > PREVIEW_COUNT && (
          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <button className="faq-view-all-btn" onClick={() => setShowAll(false)}>
              Show fewer
            </button>
          </div>
        )}

        {/* Ask AI CTA */}
        <div className="faq-ai-cta">
          <MessageSquare size={20} />
          <div>
            <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-primary)' }}>
              Can't find your answer?
            </p>
            <p style={{ margin: '4px 0 10px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
              Our AI assistant can answer any question about {hospitalData?.hospitalName || 'our hospital'} instantly.
            </p>
            <button className="faq-ask-ai-main-btn" onClick={() => askAIAbout('What can you help me with?')}>
              <MessageSquare size={14} /> Chat with AI Assistant
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
