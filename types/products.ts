export interface Product {
  id: string;
  comercio_id: string;
  nombre: string;
  descripcion: string | null;
  precio: number | null;
  stock: number | null;
  categoria: string | null;
  estado: 'activo' | 'inactivo' | 'borrador';
  imagen_url: string | null;
  created_at: string;
  updated_at: string;
}

export type ProductFilterOptions = {
  searchQuery: string;
  category: string | null;
  status: string | null;
};
