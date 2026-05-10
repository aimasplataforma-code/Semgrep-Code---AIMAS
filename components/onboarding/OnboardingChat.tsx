/**
 * OnboardingChat — Mundo Aimas
 * Interfaz conversacional principal del onboarding.
 */

import React, { useState, useRef, useEffect } from 'react';
import { useOnboarding } from '../../hooks/useOnboarding';
import ChatMessageBubble from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import WelcomeScreen from './WelcomeScreen';
import './onboarding.css';

interface OnboardingChatProps {
  onComplete: () => void;
}

/** Icono SVG de enviar */
function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
    </svg>
  );
}

export default function OnboardingChat({ onComplete }: OnboardingChatProps) {
  const {
    messages,
    status,
    progress,
    error,
    isLoading,
    startOnboarding,
    sendUserMessage,
    forceComplete,
  } = useOnboarding();

  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll al nuevo mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Si el onboarding se completó, notificar al padre
  useEffect(() => {
    if (status === 'complete') {
      const timer = setTimeout(onComplete, 3000);
      return () => clearTimeout(timer);
    }
  }, [status, onComplete]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    sendUserMessage(input.trim());
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Pantalla de bienvenida
  if (status === 'welcome') {
    return <WelcomeScreen onStart={startOnboarding} />;
  }

  // Pantalla de guardando / completado
  if (status === 'saving' || status === 'complete') {
    return (
      <div className="onboarding-container">
        <div className="onboarding-complete" style={{ flex: 1 }}>
          <div className="check-icon">
            {status === 'saving' ? '⏳' : '✅'}
          </div>
          <h2 style={{ color: '#fff', margin: '0 0 0.5rem' }}>
            {status === 'saving' ? 'Creando tu espacio digital...' : '¡Tu negocio está listo!'}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
            {status === 'saving'
              ? 'Guardando tu información y generando tu presencia digital...'
              : 'Tu oficina virtual, sitio web y chincheta en el mapa han sido creados.'}
          </p>
        </div>
      </div>
    );
  }

  // Chat principal
  return (
    <div className="onboarding-container">
      {/* Header */}
      <div className="onboarding-header">
        <div className="onboarding-header-avatar">🏗️</div>
        <div className="onboarding-header-info">
          <h2>Aimas — Arquitecta Digital</h2>
          <p>{isLoading ? 'Escribiendo...' : 'En línea'}</p>
        </div>
        <div className="onboarding-progress">
          <div className="onboarding-progress-bar">
            <div className="onboarding-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="onboarding-progress-text">{progress}%</span>
        </div>
      </div>

      {/* Messages */}
      <div className="onboarding-messages">
        {messages.map(msg => (
          <ChatMessageBubble key={msg.id} message={msg} />
        ))}
        {isLoading && <TypingIndicator />}
        {error && (
          <div style={{
            padding: '0.75rem 1rem',
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '12px',
            color: '#fca5a5',
            fontSize: '0.85rem',
            alignSelf: 'center',
          }}>
            {error}
            <button
              onClick={forceComplete}
              style={{
                display: 'block',
                marginTop: '0.5rem',
                background: 'rgba(139,92,246,0.3)',
                border: 'none',
                color: '#fff',
                padding: '0.4rem 0.8rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.8rem',
              }}
            >
              Reintentar guardar
            </button>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="onboarding-input-area">
        <div className="onboarding-input-wrapper">
          <input
            type="text"
            placeholder="Escribe tu respuesta..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            autoFocus
          />
          <button
            className="onboarding-send-btn"
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
