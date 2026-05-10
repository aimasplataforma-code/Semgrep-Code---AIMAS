/**
 * AuthGuard Component — Mundo Aimas
 * Protege rutas verificando autenticación y estado de onboarding.
 */

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { checkOnboardingStatus, type AppScreen } from '../../lib/auth-guard';

interface AuthGuardProps {
  children: (screen: AppScreen) => React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading } = useAuth();
  const [screen, setScreen] = useState<AppScreen>('loading');

  useEffect(() => {
    if (loading) {
      setScreen('loading');
      return;
    }

    if (!user) {
      setScreen('auth');
      return;
    }

    // Verificar si completó onboarding
    checkOnboardingStatus(user.id).then(comercio => {
      setScreen(comercio ? 'main' : 'onboarding');
    });
  }, [user, loading]);

  if (screen === 'loading') {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a1a',
        color: 'rgba(255,255,255,0.5)',
        fontSize: '0.9rem',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div className="auth-loading-spinner" style={{
            width: 32, height: 32,
            border: '3px solid rgba(139,92,246,0.2)',
            borderTopColor: '#8b5cf6',
            borderRadius: '50%',
            animation: 'auth-spin 0.7s linear infinite',
            margin: '0 auto 1rem',
          }} />
          Cargando Mundo Aimas...
        </div>
      </div>
    );
  }

  return <>{children(screen)}</>;
}
