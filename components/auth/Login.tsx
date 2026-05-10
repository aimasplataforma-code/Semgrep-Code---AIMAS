/**
 * Login Component — Mundo Aimas
 * Pantalla de inicio de sesión con email/password y Google OAuth.
 */

import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import './auth.css';

interface LoginProps {
  onSwitchToRegister: () => void;
}

/** Icono SVG de Google */
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

export default function Login({ onSwitchToRegister }: LoginProps) {
  const { signInWithEmail, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setError('');
    const result = await signInWithEmail(email, password);
    if (result.error) {
      setError(result.error === 'Invalid login credentials'
        ? 'Correo o contraseña incorrectos'
        : result.error);
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    setError('');
    const result = await signInWithGoogle();
    if (result.error) setError(result.error);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <h1>🏗️ Mundo Aimas</h1>
          <p>Inicia sesión en tu ecosistema digital</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="auth-error">{error}</div>}

          <div className="auth-field">
            <label>Correo electrónico</label>
            <div className="auth-input-wrapper">
              <input
                type="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div className="auth-field">
            <label>Contraseña</label>
            <div className="auth-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Tu contraseña"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="auth-eye-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading && <span className="auth-loading-spinner" />}
            {loading ? 'Ingresando...' : 'Iniciar Sesión'}
          </button>

          <div className="auth-divider">o</div>

          <button type="button" className="auth-google-btn" onClick={handleGoogle}>
            <GoogleIcon />
            Continuar con Google
          </button>
        </form>

        <div className="auth-switch">
          ¿No tienes cuenta?
          <button onClick={onSwitchToRegister}>Regístrate</button>
        </div>
      </div>
    </div>
  );
}
