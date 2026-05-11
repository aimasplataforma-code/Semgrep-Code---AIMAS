import React from 'react';
import { useCommerceContext } from '../../contexts/CommerceContext';
import ModuleCard from '../../components/ui/ModuleCard';

export default function SettingsView() {
  const { commerce } = useCommerceContext();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Configuración del Comercio</h1>
        <p className="text-slate-400">Administra los detalles y permisos de tu negocio</p>
      </div>

      <ModuleCard title="Perfil General">
        <form className="space-y-4 max-w-2xl">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Nombre del Negocio</label>
            <input 
              type="text" 
              defaultValue={commerce?.nombre_negocio || ''} 
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-violet-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Categoría Principal</label>
            <input 
              type="text" 
              defaultValue={commerce?.categoria || ''} 
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-violet-500"
            />
          </div>
          <button type="button" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-lg text-sm font-medium transition-colors">
            Guardar Cambios
          </button>
        </form>
      </ModuleCard>
    </div>
  );
}
