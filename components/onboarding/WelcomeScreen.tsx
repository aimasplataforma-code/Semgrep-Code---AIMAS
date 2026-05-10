/**
 * WelcomeScreen — Mundo Aimas
 * Pantalla de bienvenida antes de iniciar el onboarding conversacional.
 */

import React from 'react';

interface Props {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: Props) {
  return (
    <div className="welcome-screen">
      <div className="welcome-icon">🏗️</div>
      <h1>¡Bienvenido a Mundo Aimas!</h1>
      <p>
        Vamos a crear tu presencia digital en minutos.
        Nuestra IA te guiará paso a paso para configurar
        tu negocio en el ecosistema 3D.
      </p>
      <button className="welcome-start-btn" onClick={onStart}>
        Comenzar mi registro ✨
      </button>
    </div>
  );
}
