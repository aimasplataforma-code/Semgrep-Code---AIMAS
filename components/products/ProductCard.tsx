import React from 'react';
import { Product } from '../../types/products';
import { Package, MoreVertical, Edit2, Trash2 } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Determine status color
  const statusColors = {
    activo: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    inactivo: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    borrador: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  };

  const statusColor = statusColors[product.estado] || statusColors.inactivo;

  return (
    <div className="group relative bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden hover:border-violet-500/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.1)] transition-all duration-300">
      <div className="aspect-[4/3] w-full bg-slate-800/50 flex items-center justify-center overflow-hidden relative">
        {product.imagen_url ? (
          <img 
            src={product.imagen_url} 
            alt={product.nombre} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <Package size={48} className="text-slate-700" />
        )}
        <div className="absolute top-3 right-3 flex space-x-2">
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border backdrop-blur-md ${statusColor}`}>
            {product.estado.charAt(0).toUpperCase() + product.estado.slice(1)}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-semibold text-white truncate pr-2">{product.nombre}</h3>
            {product.categoria && (
              <p className="text-sm text-slate-400">{product.categoria}</p>
            )}
          </div>
          <button className="text-slate-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100 p-1">
            <MoreVertical size={18} />
          </button>
        </div>
        
        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-xs text-slate-500 mb-0.5">Precio</p>
            <p className="text-lg font-bold text-violet-400">
              {product.precio !== null ? `$${product.precio.toFixed(2)}` : 'N/A'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500 mb-0.5">Stock</p>
            <p className={`font-medium ${product.stock && product.stock > 10 ? 'text-slate-300' : 'text-amber-400'}`}>
              {product.stock !== null ? `${product.stock} un.` : '--'}
            </p>
          </div>
        </div>
      </div>
      
      {/* Quick Actions Overlay (Appears on Hover) */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-900/90 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-end space-x-2">
        <button className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors" title="Editar">
          <Edit2 size={16} />
        </button>
        <button className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg transition-colors" title="Eliminar">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
