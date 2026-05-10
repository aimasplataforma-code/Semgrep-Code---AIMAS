/**
 * TypingIndicator — Mundo Aimas
 * Animación de "IA escribiendo..." tipo WhatsApp.
 */

import React from 'react';

export default function TypingIndicator() {
  return (
    <div className="typing-indicator">
      <div className="typing-dot" />
      <div className="typing-dot" />
      <div className="typing-dot" />
    </div>
  );
}
