import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthContext } from './AuthContext';

export interface Commerce {
  id: string;
  usuario_id: string;
  nombre_negocio: string;
  categoria: string;
  descripcion: string | null;
  // Expand this based on the real schema
  [key: string]: any;
}

interface CommerceContextType {
  commerce: Commerce | null;
  loading: boolean;
  error: string | null;
  refreshCommerce: () => Promise<void>;
}

const CommerceContext = createContext<CommerceContextType | null>(null);

export function CommerceProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext();
  const [commerce, setCommerce] = useState<Commerce | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCommerce = async () => {
    if (!user) {
      setCommerce(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const { data, error: sbError } = await supabase
        .from('comercios')
        .select('*')
        .eq('usuario_id', user.id)
        .single();

      if (sbError) throw sbError;
      setCommerce(data as Commerce);
    } catch (err: any) {
      console.error('Error fetching commerce:', err);
      setError(err.message || 'Failed to load commerce data');
      setCommerce(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommerce();
  }, [user]);

  return (
    <CommerceContext.Provider value={{ commerce, loading, error, refreshCommerce: fetchCommerce }}>
      {children}
    </CommerceContext.Provider>
  );
}

export function useCommerceContext() {
  const context = useContext(CommerceContext);
  if (!context) {
    throw new Error('useCommerceContext must be used within a CommerceProvider');
  }
  return context;
}
