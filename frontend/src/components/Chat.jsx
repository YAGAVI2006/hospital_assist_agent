/* eslint-disable react-hooks/purity */
import { useState, useEffect, useRef } from 'react'

const Chat = ({ isDarkMode = true, onToggleTheme = () => {} }) => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [isConnected, setIsConnected] = useState(true)
  const chatWindowRef = useRef(null)
  const requestInProgressRef = useRef(false)

  const suggestedQuestions = [
    'OP Timings',
    'Available Doctors',
    'Departments',
    'Visiting Hours',
    'Emergency Services',
    'Insurance'
  ]

  // Auto-scroll to latest message
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight
    }
  }, [messages, loading])

  const addMessage = (message) => {
    setMessages((current) => [...current, message])
  }

  const clearChat = () => {
    setMessages([])
    setInput('')
  }

  const handleSend = async (event, messageText = null) => {
    event.preventDefault()
    
    // Prevent duplicate requests
    if (requestInProgressRef.current || loading) {
      return
    }

    const messageToSend = messageText || input.trim()
    if (!messageToSend) {
      return
    }

    // Mark request as in progress
    requestInProgressRef.current = true
    setLoading(true)

    const userMessage = { id: Date.now(), role: 'user', text: messageToSend }
    addMessage(userMessage)
    
    // Only clear input if it was from the form, not from suggested question
    if (!messageText) {
      setInput('')
    }

    try {
      setIsConnected(true)
      const response = await fetch('https://hospital-assist-agent.onrender.com/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageToSend,
          history: messages.map(msg => ({ role: msg.role, text: msg.text }))
        })
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Unable to fetch chat response')
      }

      addMessage({ id: Date.now() + 1, role: 'bot', text: data.reply || 'No reply received.' })
    } catch (error) {
      setIsConnected(false)
      const errorMessage = error.message || 'Unable to reach the hospital chat service'
      addMessage({
        id: Date.now() + 2,
        role: 'error',
        text: errorMessage === 'Failed to fetch' 
          ? 'Sorry, the hospital service is currently unavailable. Please try again later.' 
          : errorMessage
      })
    } finally {
      setLoading(false)
      requestInProgressRef.current = false
    }
  }

  const handleSuggestedQuestion = (question) => {
    const event = { preventDefault: () => {} }
    handleSend(event, question)
  }

  const handleKeyDown = (event) => {
    // Enter to send, Shift+Enter for new line (if multiline is needed)
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSend(event)
    }
  }

  return (
    <div className="chat-wrapper">
      <div className="chat-header">
        <div className="chat-header-content">
          <div className="chat-title-section">
            <h2>🏥 Hospital Information Agent</h2>
            <p>Ask any questions about Starlight Medical Center and get instant answers.</p>
          </div>
          <div className="header-buttons">
            <button className="theme-toggle-btn" onClick={onToggleTheme} title="Toggle theme">
              <span>{isDarkMode ? '☀️' : '🌙'}</span>
            </button>
            <button className="clear-chat-btn" onClick={clearChat} title="Clear all messages">
              Clear Chat
            </button>
          </div>
        </div>
        {!isConnected && (
          <div className="connection-warning">
            ⚠️ Service unavailable. Please check your connection and try again.
          </div>
        )}
      </div>

      <div className="chat-window" ref={chatWindowRef}>
        {messages.length === 0 ? (
          <div className="chat-empty">
            <p>👋 Welcome! Ask me anything about the hospital...</p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chat-message chat-${message.role}`}
              >
                <div className="message-content">
                  {message.role === 'user' && <span className="message-badge">You</span>}
                  {message.role === 'bot' && <span className="message-badge">🤖 Hospital AI</span>}
                  {message.role === 'error' && <span className="message-badge">⚠️ Error</span>}
                  <p>{message.text}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="chat-message chat-loading">
                <div className="message-content">
                  <span className="message-badge">🤖 Hospital AI</span>
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <span className="typing-text">AI is typing...</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {messages.length === 0 && (
        <div className="suggested-questions">
          <div className="suggestions-header">
            <span className="suggestions-icon">✨</span>
            <p className="suggestions-title">Suggested Questions</p>
          </div>
          <div className="suggestions-grid">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                className="suggestion-chip"
                onClick={() => handleSuggestedQuestion(question)}
                disabled={loading}
                title={question}
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="chat-footer">
        <form className="chat-form" onSubmit={handleSend}>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your question here... (Enter to send, Shift+Enter for new line)"
            aria-label="Chat message"
            disabled={loading}
            rows="1"
            className="chat-input"
          />
          <button 
            type="submit" 
            disabled={loading || !input.trim()}
            title={loading ? 'Waiting for response...' : 'Send message (Enter)'}
            className="send-button"
          >
            {loading ? '⏳' : '📤'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Chat
