import React from 'react';
import EmptyState from '../../components/ui/EmptyState';
import { ShoppingCart } from 'lucide-react';

export default function OrdersView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Pedidos en Tiempo Real</h1>
        <p className="text-slate-400">Monitorea y gestiona las órdenes de tus clientes</p>
      </div>

      <EmptyState 
        icon={ShoppingCart}
        title="Bandeja Vacía"
        description="Aún no has recibido ningún pedido. Cuando un cliente interactúe con tu comercio 3D, aparecerá aquí."
      />
    </div>
  );
}
