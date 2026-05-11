import React from 'react';

interface ModuleCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export default function ModuleCard({ title, subtitle, children, action, className = '' }: ModuleCardProps) {
  return (
    <div className={`bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-md shadow-xl ${className}`}>
      <div className="px-6 py-5 border-b border-slate-800/80 flex justify-between items-center bg-slate-900/40">
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {subtitle && <p className="text-sm text-slate-400 mt-1">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
