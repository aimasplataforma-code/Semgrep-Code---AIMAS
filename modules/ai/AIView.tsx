import React from 'react';
import EmptyState from '../../components/ui/EmptyState';
import { Bot } from 'lucide-react';

export default function AIView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Centro Neural Aimas</h1>
        <p className="text-slate-400">Auditoría de conversaciones y entrenamiento del asistente virtual</p>
      </div>

      <EmptyState 
        icon={Bot}
        title="IA en espera"
        description="Aún no hay registros de conversaciones entre clientes y tu agente virtual."
      />
    </div>
  );
}
