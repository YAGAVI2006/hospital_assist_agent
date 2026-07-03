import { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, ChevronDown, Sparkles } from 'lucide-react';

const FloatingAIWidget = ({ hospitalName }) => {
  const [promptVisible, setPromptVisible] = useState(false);
  const [widgetHidden, setWidgetHidden] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const chatSectionRef = useRef(null);

  // Show the welcome prompt after 3 seconds on first load
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!dismissed) setPromptVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [dismissed]);

  // Hide widget when chat section is in view
  useEffect(() => {
    const chatSection = document.getElementById('chat-section');
    if (!chatSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setWidgetHidden(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    observer.observe(chatSection);
    return () => observer.disconnect();
  }, []);

  const handleOpen = () => {
    setPromptVisible(false);
    const chatSection = document.getElementById('chat-section');
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const textarea = document.querySelector('.chat-input');
        if (textarea) {
          textarea.focus();
        }
      }, 900);
    }
  };

  const handleDismiss = (e) => {
    e.stopPropagation();
    setPromptVisible(false);
    setDismissed(true);
  };

  if (widgetHidden) return null;

  return (
    <div className="floating-widget-container">
      {/* Welcome prompt bubble */}
      {promptVisible && (
        <div className="floating-prompt-bubble">
          <button className="floating-prompt-dismiss" onClick={handleDismiss} aria-label="Dismiss">
            <X size={14} />
          </button>
          <div className="floating-prompt-header">
            <Sparkles size={15} className="floating-prompt-sparkle" />
            <span>AI Assistant</span>
          </div>
          <p className="floating-prompt-text">
            Need help? Ask me anything about{' '}
            <strong>{hospitalName || 'Starlight Medical Center'}</strong> — doctors, timings, services and more.
          </p>
          <button className="floating-prompt-cta" onClick={handleOpen}>
            Start Chatting <ChevronDown size={14} />
          </button>
        </div>
      )}

      {/* Main floating button */}
      <button
        className={`floating-ai-btn ${promptVisible ? 'active' : ''}`}
        onClick={handleOpen}
        aria-label="Open AI Assistant"
        title="Chat with AI"
      >
        <div className="floating-ai-btn-ring" />
        <MessageSquare size={22} />
      </button>
    </div>
  );
};

export default FloatingAIWidget;
