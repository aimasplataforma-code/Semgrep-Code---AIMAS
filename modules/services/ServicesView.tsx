import React from 'react';
import EmptyState from '../../components/ui/EmptyState';
import { Briefcase } from 'lucide-react';

export default function ServicesView() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Directorio de Servicios</h1>
          <p className="text-slate-400">Ofrece servicios virtuales o físicos</p>
        </div>
        <button className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-sm font-medium transition-colors">
          Añadir Servicio
        </button>
      </div>

      <EmptyState 
        icon={Briefcase}
        title="Sin servicios activos"
        description="Agrega los servicios que ofreces para que la IA pueda recomendarlos a tus clientes potenciales."
      />
    </div>
  );
}
