import React from 'react';

interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({ message = 'Cargando módulo...' }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[400px] p-8 text-slate-400">
      <div className="w-12 h-12 border-4 border-slate-700 border-t-violet-500 rounded-full animate-spin mb-4"></div>
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
