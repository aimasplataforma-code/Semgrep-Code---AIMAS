import React, { useState } from 'react';
import { useProducts } from '../../hooks/products/useProducts';
import ProductGrid from '../../components/products/ProductGrid';
import ProductTable from '../../components/products/ProductTable';
import ProductFilters from '../../components/products/ProductFilters';
import EmptyState from '../../components/ui/EmptyState';
import LoadingState from '../../components/ui/LoadingState';
import { PackageOpen, Plus } from 'lucide-react';

export default function ProductsView() {
  const { products, loading, error, filters, updateFilters, executeSearch } = useProducts();
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Catálogo de Productos</h1>
          <p className="text-slate-400">Gestiona tu inventario sincronizado en tiempo real</p>
        </div>
        <button className="flex items-center px-4 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-sm font-medium transition-colors shadow-[0_0_15px_rgba(139,92,246,0.3)]">
          <Plus size={18} className="mr-2" />
          Nuevo Producto
        </button>
      </div>

      {/* Filters */}
      <ProductFilters 
        filters={filters} 
        viewMode={viewMode}
        onUpdateFilters={updateFilters} 
        onSearch={executeSearch} 
        onViewModeChange={setViewMode}
      />

      {/* Content Area */}
      {error ? (
        <div className="p-6 bg-rose-500/10 border border-rose-500/20 rounded-xl text-center">
          <p className="text-rose-400 font-medium">Ocurrió un error: {error}</p>
        </div>
      ) : loading ? (
        <LoadingState message="Cargando tu catálogo en tiempo real..." />
      ) : products.length === 0 ? (
        <EmptyState 
          icon={PackageOpen}
          title={filters.searchQuery || filters.status ? "No se encontraron resultados" : "Tu catálogo está vacío"}
          description={filters.searchQuery || filters.status 
            ? "Intenta cambiar los filtros o el término de búsqueda." 
            : "Añade tu primer producto para que los usuarios puedan interactuar con él en tu espacio digital."}
          actionLabel={filters.searchQuery || filters.status ? "Limpiar Filtros" : "Crear Producto"}
          onAction={() => {
            if (filters.searchQuery || filters.status) {
              updateFilters({ searchQuery: '', status: null, category: null });
              executeSearch();
            } else {
              console.log('Open create modal');
            }
          }}
        />
      ) : viewMode === 'grid' ? (
        <ProductGrid products={products} />
      ) : (
        <ProductTable products={products} />
      )}
    </div>
  );
}
