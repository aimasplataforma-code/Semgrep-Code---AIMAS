/**
 * Database type definitions matching Supabase schema.
 * Mundo Aimas — Pilar 1
 */

export interface Usuario {
  id: string;
  email: string;
  google_id?: string;
  nombre?: string;
  created_at: string;
}

export interface Comercio {
  id: string;
  usuario_id: string;
  nombre: string;
  slug: string;
  categoria?: string;
  descripcion?: string;
  direccion?: string;
  ciudad?: string;
  telefono?: string;
  whatsapp?: string;
  coordenadas_lat?: number;
  coordenadas_lng?: number;
  codigo_postal?: string;
  horarios?: Record<string, string>;
  activo: boolean;
  plan: string;
  created_at: string;
}

export interface Producto {
  id: string;
  comercio_id: string;
  nombre: string;
  descripcion?: string;
  precio?: number;
  imagenes?: string[];
  categoria_id?: string;
  etiquetas?: string[];
  meta_etiquetas?: string[];
  codigo_barra?: string;
  codigo_qr?: string;
  visible: boolean;
  orden?: number;
  created_at: string;
}

export interface Servicio {
  id: string;
  comercio_id: string;
  nombre: string;
  descripcion?: string;
  imagenes?: string[];
  parametros_cotizacion?: Record<string, unknown>;
  prompt_ia?: string;
  precio_base?: number;
  activo: boolean;
  created_at: string;
}

export interface ContextoIA {
  id: string;
  comercio_id: string;
  personalidad?: string;
  tono: string;
  prompt_maestro?: string;
  base_conocimiento?: string;
  reglas_comportamiento?: string;
  mcp_config?: Record<string, unknown>;
  updated_at: string;
}

export interface Diseno {
  id: string;
  comercio_id: string;
  plantilla: string;
  paleta_colores?: Record<string, string>;
  enlace_logo?: string;
  enlace_video_hero?: string;
  imagenes_carrusel?: string[];
  estilo_custom?: Record<string, unknown>;
  updated_at: string;
}

export interface RedesSociales {
  id: string;
  comercio_id: string;
  facebook?: string;
  instagram?: string;
  whatsapp?: string;
  tiktok?: string;
  youtube?: string;
  canal_novedades?: string;
  enlace_google_maps?: string;
  enlace_calificaciones?: string;
  dominio_propio?: string;
}

/** Datos recopilados durante el onboarding */
export interface OnboardingData {
  nombre_usuario: string;
  nombre_negocio: string;
  categoria: string;
  ciudad: string;
  direccion: string;
  telefono: string;
  whatsapp: string;
  descripcion: string;
  productos_servicios: string;
  estilo_visual: string;
  colores: string;
  redes_sociales: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    youtube?: string;
  };
}

/** Mensaje en el chat de onboarding */
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

/** Los 3 prompts maestros generados */
export interface PromptsMaestros {
  prompt_info: string;
  prompt_diseno: string;
  prompt_contexto_ia: string;
}
