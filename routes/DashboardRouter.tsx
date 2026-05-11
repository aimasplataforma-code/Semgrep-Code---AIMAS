import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../layouts/dashboard/DashboardLayout';
import ProtectedDashboardRoute from '../components/dashboard/ProtectedDashboardRoute';
import { CommerceProvider } from '../contexts/CommerceContext';
import LoadingState from '../components/ui/LoadingState';

// Lazy loading dashboard modules to reduce initial chunk size
const DashboardHome = React.lazy(() => import('../modules/home/DashboardHome'));
const ProductsView = React.lazy(() => import('../modules/products/ProductsView'));
const OrdersView = React.lazy(() => import('../modules/orders/OrdersView'));
const ServicesView = React.lazy(() => import('../modules/services/ServicesView'));
const AIView = React.lazy(() => import('../modules/ai/AIView'));
const SettingsView = React.lazy(() => import('../modules/settings/SettingsView'));

const SuspenseLoader = () => (
  <div className="flex-1 flex items-center justify-center min-h-[50vh]">
    <LoadingState message="Cargando módulo..." />
  </div>
);

export default function DashboardRouter() {
  return (
    <CommerceProvider>
      <Routes>
        <Route element={<ProtectedDashboardRoute />}>
          <Route element={<DashboardLayout />}>
            <Route index element={
              <Suspense fallback={<SuspenseLoader />}>
                <DashboardHome />
              </Suspense>
            } />
            <Route path="products" element={
              <Suspense fallback={<SuspenseLoader />}>
                <ProductsView />
              </Suspense>
            } />
            <Route path="orders" element={
              <Suspense fallback={<SuspenseLoader />}>
                <OrdersView />
              </Suspense>
            } />
            <Route path="services" element={
              <Suspense fallback={<SuspenseLoader />}>
                <ServicesView />
              </Suspense>
            } />
            <Route path="ai" element={
              <Suspense fallback={<SuspenseLoader />}>
                <AIView />
              </Suspense>
            } />
            <Route path="settings" element={
              <Suspense fallback={<SuspenseLoader />}>
                <SettingsView />
              </Suspense>
            } />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Route>
      </Routes>
    </CommerceProvider>
  );
}
