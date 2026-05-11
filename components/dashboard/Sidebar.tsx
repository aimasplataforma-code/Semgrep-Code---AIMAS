import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Briefcase, 
  Bot, 
  Settings,
  Store
} from 'lucide-react';

export default function Sidebar() {
  const navItems = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Panel Principal", end: true },
    { to: "/dashboard/products", icon: Package, label: "Productos" },
    { to: "/dashboard/services", icon: Briefcase, label: "Servicios" },
    { to: "/dashboard/orders", icon: ShoppingCart, label: "Pedidos" },
    { to: "/dashboard/ai", icon: Bot, label: "Aimas AI" },
    { to: "/dashboard/settings", icon: Settings, label: "Configuración" },
  ];

  return (
    <aside className="w-64 h-screen bg-slate-900 border-r border-slate-800 flex flex-col hidden md:flex shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-slate-800 shrink-0">
        <Store className="text-violet-500 mr-3" size={24} />
        <span className="text-xl font-bold text-white tracking-tight">Mundo Aimas</span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-violet-600/10 text-violet-400 font-medium' 
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                  }`
                }
              >
                <Icon size={20} className="mr-3" />
                {item.label}
              </NavLink>
            );
          })}
        </div>
      </div>
      
      <div className="p-4 border-t border-slate-800 shrink-0">
        <div className="p-4 bg-slate-800/50 rounded-xl">
          <p className="text-xs text-slate-400 mb-2">Fase 2 - Modo Arquitecto</p>
          <div className="flex items-center text-sm font-medium text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
            Sistema Activo
          </div>
        </div>
      </div>
    </aside>
  );
}
