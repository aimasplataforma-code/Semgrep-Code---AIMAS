import React from 'react';
import { useCommerceContext } from '../../contexts/CommerceContext';
import ModuleCard from '../../components/ui/ModuleCard';
import { TrendingUp, Users, ShoppingBag, Activity } from 'lucide-react';

export default function DashboardHome() {
  const { commerce } = useCommerceContext();

  const stats = [
    { label: 'Visitas hoy', value: '0', icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Pedidos activos', value: '0', icon: ShoppingBag, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { label: 'Tasa de conversión', value: '0%', icon: TrendingUp, color: 'text-violet-400', bg: 'bg-violet-400/10' },
    { label: 'Consultas AI', value: '0', icon: Activity, color: 'text-rose-400', bg: 'bg-rose-400/10' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Resumen de {commerce?.nombre_negocio}</h1>
          <p className="text-slate-400">Control de mando y métricas principales</p>
        </div>
        <button className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-sm font-medium transition-colors">
          Nuevo Reporte
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-400 text-sm font-medium mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ModuleCard className="lg:col-span-2" title="Actividad Reciente">
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-slate-800 rounded-xl">
            <p className="text-slate-500">Esperando datos de actividad...</p>
          </div>
        </ModuleCard>

        <ModuleCard title="Asistente Aimas">
          <div className="h-64 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center mb-4">
              <Activity size={32} />
            </div>
            <h4 className="text-white font-medium mb-2">Todo en orden</h4>
            <p className="text-sm text-slate-400">Tu comercio está listo para recibir clientes en el entorno 3D.</p>
          </div>
        </ModuleCard>
      </div>
    </div>
  );
}
