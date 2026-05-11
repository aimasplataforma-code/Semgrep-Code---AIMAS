import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Product, ProductFilterOptions } from '../../types/products';
import { useCommerceContext } from '../../contexts/CommerceContext';

export function useProducts() {
  const { commerce } = useCommerceContext();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter state
  const [filters, setFilters] = useState<ProductFilterOptions>({
    searchQuery: '',
    category: null,
    status: null,
  });

  const fetchProducts = async () => {
    if (!commerce) return;
    
    try {
      setLoading(true);
      setError(null);
      
      let query = supabase
        .from('products')
        .select('*')
        .eq('comercio_id', commerce.id)
        .order('created_at', { ascending: false });

      if (filters.status) {
        query = query.eq('estado', filters.status);
      }
      if (filters.category) {
        query = query.eq('categoria', filters.category);
      }
      if (filters.searchQuery) {
        query = query.ilike('nombre', `%${filters.searchQuery}%`);
      }

      const { data, error: fetchError } = await query;
      
      if (fetchError) throw fetchError;
      setProducts(data as Product[]);
      
    } catch (err: any) {
      console.error('Error fetching products:', err);
      setError(err.message || 'Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (commerce) {
      fetchProducts();
    }
  }, [commerce, filters.status, filters.category]); 
  // Not dependent on searchQuery directly here to allow debouncing in the UI if needed,
  // but we can add it or just trigger fetchProducts on search submit.

  // Set up Realtime Subscription
  useEffect(() => {
    if (!commerce) return;

    const channel = supabase
      .channel(`commerce_${commerce.id}_products`)
      .on(
        'postgres_changes',
        {
          event: '*', // INSERT, UPDATE, DELETE
          schema: 'public',
          table: 'products',
          filter: `comercio_id=eq.${commerce.id}`,
        },
        (payload) => {
          console.log('Realtime product update:', payload);
          // Optimistic UI updates
          if (payload.eventType === 'INSERT') {
            setProducts((prev) => [payload.new as Product, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setProducts((prev) =>
              prev.map((p) => (p.id === payload.new.id ? (payload.new as Product) : p))
            );
          } else if (payload.eventType === 'DELETE') {
            setProducts((prev) => prev.filter((p) => p.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [commerce]);

  const updateFilters = (newFilters: Partial<ProductFilterOptions>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // Allow triggering a manual search
  const executeSearch = () => {
    fetchProducts();
  };

  return {
    products,
    loading,
    error,
    filters,
    updateFilters,
    executeSearch,
    refreshProducts: fetchProducts,
  };
}
