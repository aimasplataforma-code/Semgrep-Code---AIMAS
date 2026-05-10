/**
 * useAuth Hook — Mundo Aimas
 * Wrapper conveniente sobre AuthContext.
 */

import { useAuthContext } from '../contexts/AuthContext';

export function useAuth() {
  return useAuthContext();
}

export default useAuth;
