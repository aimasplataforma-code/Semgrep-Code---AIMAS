import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { useCommerceContext } from '../../contexts/CommerceContext';
import LoadingState from '../ui/LoadingState';

export default function ProtectedDashboardRoute() {
  const { user, loading: authLoading } = useAuthContext();
  const { commerce, loading: commerceLoading } = useCommerceContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      // Not authenticated, redirect to login via main app router 
      // (This assumes React Router is mounted below the main AuthGuard, 
      // but if using RR globally, you'd navigate to /login)
      window.location.href = '/'; 
    } else if (!authLoading && !commerceLoading && !commerce) {
      // User has no commerce, needs onboarding
      window.location.href = '/'; 
    }
  }, [user, authLoading, commerce, commerceLoading]);

  if (authLoading || commerceLoading) {
    return (
      <div className="h-screen w-screen bg-slate-950 flex items-center justify-center">
        <LoadingState message="Inicializando Oficina Virtual..." />
      </div>
    );
  }

  if (!user || !commerce) {
    return null; // Will redirect via useEffect
  }

  return <Outlet />;
}
