import React from 'react';
import { Product } from '../../types/products';
import { Package, MoreVertical, Edit2, Trash2 } from 'lucide-react';

interface ProductTableProps {
  products: Product[];
}

export default function ProductTable({ products }: ProductTableProps) {
  const statusColors = {
    activo: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    inactivo: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    borrador: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900/80 border-b border-slate-800 text-slate-400 text-sm">
              <th className="p-4 font-medium">Producto</th>
              <th className="p-4 font-medium">Categoría</th>
              <th className="p-4 font-medium">Precio</th>
              <th className="p-4 font-medium">Stock</th>
              <th className="p-4 font-medium">Estado</th>
              <th className="p-4 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {products.map((product) => {
              const statusColor = statusColors[product.estado] || statusColors.inactivo;
              
              return (
                <tr key={product.id} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center overflow-hidden shrink-0">
                        {product.imagen_url ? (
                          <img src={product.imagen_url} alt={product.nombre} className="w-full h-full object-cover" />
                        ) : (
                          <Package size={20} className="text-slate-500" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{product.nombre}</p>
                        <p className="text-xs text-slate-500 truncate max-w-[200px]">{product.descripcion || 'Sin descripción'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-slate-300">
                    {product.categoria || '--'}
                  </td>
                  <td className="p-4 text-sm font-medium text-violet-400">
                    {product.precio !== null ? `$${product.precio.toFixed(2)}` : 'N/A'}
                  </td>
                  <td className="p-4">
                    <span className={`text-sm ${product.stock && product.stock > 10 ? 'text-slate-300' : 'text-amber-400'}`}>
                      {product.stock !== null ? product.stock : '--'}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusColor}`}>
                      {product.estado.charAt(0).toUpperCase() + product.estado.slice(1)}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors" title="Editar">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-1.5 text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 rounded-lg transition-colors" title="Eliminar">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
