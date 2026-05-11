/// <reference types="vite/client" />

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React, {useCallback, useState, useEffect, useRef} from 'react';

import ControlTray from './components/ControlTray';
import ErrorScreen from './components/ErrorScreen';
import StreamingConsole from './components/streaming-console/StreamingConsole';
import PopUp from './components/popup/PopUp';
import Sidebar from './components/Sidebar';
import { LiveAPIProvider } from './contexts/LiveAPIContext';
// FIX: Correctly import APIProvider as a named export.
import { APIProvider, useMapsLibrary } from '@vis.gl/react-google-maps';
import { Map3D, Map3DCameraProps} from './components/map-3d';
import { useMapStore } from './lib/state';
import { MapController } from './lib/map-controller';
import { AuthProvider } from './contexts/AuthContext';
import AuthGuard from './components/auth/AuthGuard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './components/auth/auth.css';
import type { AppScreen } from './lib/auth-guard';
import { Routes, Route } from 'react-router-dom';

import { Suspense, lazy } from 'react';

const DashboardRouter = lazy(() => import('./routes/DashboardRouter'));
const OnboardingChat = lazy(() => import('./components/onboarding/OnboardingChat'));
const MapApplication = lazy(() => import('./modules/map/MapApplication'));

import LoadingState from './components/ui/LoadingState';

const ScreenLoader = () => (
  <div className="h-screen w-screen bg-slate-950 flex items-center justify-center">
    <LoadingState message="Cargando módulo..." />
  </div>
);

/**
 * Main application component.
 * Routes between Auth → Onboarding → Main App based on user state.
 */
function App() {
  return (
    <AuthProvider>
      <AuthGuard>
        {(screen) => (
          <Suspense fallback={<ScreenLoader />}>
            <AppRouter screen={screen} />
          </Suspense>
        )}
      </AuthGuard>
    </AuthProvider>
  );
}

/** Router component that renders the correct screen */
function AppRouter({ screen }: { screen: AppScreen }) {
  const [authView, setAuthView] = React.useState<'login' | 'register'>('login');

  if (screen === 'auth') {
    return authView === 'login'
      ? <Login onSwitchToRegister={() => setAuthView('register')} />
      : <Register onSwitchToLogin={() => setAuthView('login')} />;
  }

  if (screen === 'onboarding') {
    return <OnboardingChat onComplete={() => window.location.reload()} />;
  }

  // screen === 'main' → Enrutamiento entre Mapa 3D original y Dashboard
  return (
    <Routes>
      <Route path="/dashboard/*" element={<DashboardRouter />} />
      <Route path="*" element={
        <div className="App">
          <MapApplication />
        </div>
      } />
    </Routes>
  );
}

export default App;
