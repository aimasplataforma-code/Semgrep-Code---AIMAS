import React from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { useCommerceContext } from '../../contexts/CommerceContext';
import { Bell, Menu, User, LogOut } from 'lucide-react';

export default function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const { signOut } = useAuthContext();
  const { commerce } = useCommerceContext();

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-4 lg:px-8 shrink-0 sticky top-0 z-20">
      <div className="flex items-center">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 text-slate-400 hover:text-white mr-2"
        >
          <Menu size={24} />
        </button>
        <h2 className="text-lg font-medium text-slate-200 hidden sm:block">
          {commerce ? commerce.nombre_negocio : 'Oficina Virtual'}
        </h2>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 text-slate-400 hover:text-white relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-slate-900"></span>
        </button>
        
        <div className="h-8 w-px bg-slate-800 mx-2"></div>
        
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-white leading-tight">Administrador</p>
            <p className="text-xs text-slate-400">Owner</p>
          </div>
          <button className="h-9 w-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:bg-slate-700 transition-colors">
            <User size={18} />
          </button>
          <button 
            onClick={() => signOut()}
            className="p-2 text-slate-400 hover:text-rose-400 transition-colors ml-1"
            title="Cerrar Sesión"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
