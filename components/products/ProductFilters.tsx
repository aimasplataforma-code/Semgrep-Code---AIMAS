import React from 'react';
import { Search, Filter } from 'lucide-react';
import { ProductFilterOptions } from '../../types/products';

interface ProductFiltersProps {
  filters: ProductFilterOptions;
  viewMode: 'grid' | 'table';
  onUpdateFilters: (filters: Partial<ProductFilterOptions>) => void;
  onSearch: () => void;
  onViewModeChange: (mode: 'grid' | 'table') => void;
}

export default function ProductFilters({ filters, viewMode, onUpdateFilters, onSearch, onViewModeChange }: ProductFiltersProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-slate-900/40 border border-slate-800 rounded-xl backdrop-blur-sm">
      <div className="flex-1 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-slate-500" />
        </div>
        <input
          type="text"
          placeholder="Buscar productos por nombre..."
          className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
          value={filters.searchQuery}
          onChange={(e) => onUpdateFilters({ searchQuery: e.target.value })}
          onKeyDown={handleKeyDown}
        />
      </div>
      
      <div className="flex gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter size={18} className="text-slate-500" />
          </div>
          <select
            className="appearance-none bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-10 py-2 text-slate-300 focus:outline-none focus:border-violet-500 transition-all"
            value={filters.status || ''}
            onChange={(e) => onUpdateFilters({ status: e.target.value || null })}
          >
            <option value="">Todos los estados</option>
            <option value="activo">Activos</option>
            <option value="inactivo">Inactivos</option>
            <option value="borrador">Borradores</option>
          </select>
        </div>
        
        <button 
          onClick={onSearch}
          className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors border border-slate-700"
        >
          Buscar
        </button>

        <div className="h-10 w-px bg-slate-800 hidden sm:block"></div>

        <div className="flex bg-slate-950 border border-slate-800 rounded-lg p-1 hidden sm:flex">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}
            title="Vista de Cuadrícula"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
          </button>
          <button
            onClick={() => onViewModeChange('table')}
            className={`p-1.5 rounded-md transition-colors ${viewMode === 'table' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}
            title="Vista de Tabla"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
