/**
 * ChatMessage Component — Mundo Aimas
 * Renderiza una burbuja de mensaje estilo WhatsApp.
 */

import React from 'react';
import type { ChatMessage as ChatMessageType } from '../../types/database';

interface Props {
  message: ChatMessageType;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
}

/** Limpia marcas internas del texto antes de renderizar */
function cleanText(text: string): string {
  return text.replace('[ONBOARDING_COMPLETE]', '').trim();
}

export default function ChatMessageBubble({ message }: Props) {
  return (
    <div className={`chat-message ${message.role}`}>
      <div className="chat-bubble">
        {cleanText(message.content)}
      </div>
      <div className="chat-time">
        {formatTime(message.timestamp)}
      </div>
    </div>
  );
}
