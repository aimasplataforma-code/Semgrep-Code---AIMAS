/**
 * Onboarding Parser
 * Extrae datos estructurados de la conversación de onboarding.
 */

import type { OnboardingData } from '../types/database';

/** Campos requeridos para completar el onboarding */
export const REQUIRED_FIELDS: (keyof OnboardingData)[] = [
  'nombre_usuario',
  'nombre_negocio',
  'categoria',
  'ciudad',
  'direccion',
  'telefono',
  'whatsapp',
  'descripcion',
  'productos_servicios',
  'estilo_visual',
  'colores',
];

/** Estado inicial vacío del onboarding */
export function createEmptyOnboardingData(): OnboardingData {
  return {
    nombre_usuario: '',
    nombre_negocio: '',
    categoria: '',
    ciudad: '',
    direccion: '',
    telefono: '',
    whatsapp: '',
    descripcion: '',
    productos_servicios: '',
    estilo_visual: '',
    colores: '',
    redes_sociales: {},
  };
}

/** Genera un slug URL-friendly a partir del nombre del negocio */
export function generateSlug(nombre: string): string {
  return nombre
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Calcula el porcentaje de campos completados */
export function getCompletionPercentage(data: OnboardingData): number {
  const filled = REQUIRED_FIELDS.filter(field => {
    const value = data[field];
    return typeof value === 'string' && value.trim().length > 0;
  });
  return Math.round((filled.length / REQUIRED_FIELDS.length) * 100);
}

/** Verifica si el onboarding está completo */
export function isOnboardingComplete(data: OnboardingData): boolean {
  return getCompletionPercentage(data) === 100;
}

/** Obtiene los campos que faltan por llenar */
export function getMissingFields(data: OnboardingData): string[] {
  return REQUIRED_FIELDS.filter(field => {
    const value = data[field];
    return typeof value !== 'string' || value.trim().length === 0;
  });
}

/**
 * Prompt del sistema para pedirle a Gemini que extraiga datos estructurados.
 * Se usa DESPUÉS de cada mensaje del usuario para actualizar los campos.
 */
export const EXTRACTION_PROMPT = `Analiza la siguiente conversación de onboarding y extrae SOLO los datos que el usuario ha proporcionado explícitamente.

Responde ÚNICAMENTE con un JSON válido con los campos que puedas extraer. Si un campo no fue mencionado, no lo incluyas.

Campos posibles:
- nombre_usuario: nombre del dueño
- nombre_negocio: nombre del comercio
- categoria: tipo/categoría del negocio
- ciudad: ciudad donde opera
- direccion: dirección completa
- telefono: número de teléfono
- whatsapp: número de WhatsApp
- descripcion: descripción del negocio
- productos_servicios: lista de productos o servicios
- estilo_visual: estilo visual preferido (moderno, clásico, minimalista, etc.)
- colores: colores preferidos
- redes_facebook: enlace de Facebook
- redes_instagram: enlace de Instagram
- redes_tiktok: enlace de TikTok
- redes_youtube: enlace de YouTube

Responde SOLO con el JSON, sin texto adicional ni markdown.`;

/**
 * Parsea la respuesta JSON de Gemini y actualiza los datos del onboarding.
 */
export function mergeExtractedData(
  current: OnboardingData,
  extracted: Record<string, string>
): OnboardingData {
  const updated = { ...current };

  if (extracted.nombre_usuario) updated.nombre_usuario = extracted.nombre_usuario;
  if (extracted.nombre_negocio) updated.nombre_negocio = extracted.nombre_negocio;
  if (extracted.categoria) updated.categoria = extracted.categoria;
  if (extracted.ciudad) updated.ciudad = extracted.ciudad;
  if (extracted.direccion) updated.direccion = extracted.direccion;
  if (extracted.telefono) updated.telefono = extracted.telefono;
  if (extracted.whatsapp) updated.whatsapp = extracted.whatsapp;
  if (extracted.descripcion) updated.descripcion = extracted.descripcion;
  if (extracted.productos_servicios) updated.productos_servicios = extracted.productos_servicios;
  if (extracted.estilo_visual) updated.estilo_visual = extracted.estilo_visual;
  if (extracted.colores) updated.colores = extracted.colores;

  if (extracted.redes_facebook) updated.redes_sociales.facebook = extracted.redes_facebook;
  if (extracted.redes_instagram) updated.redes_sociales.instagram = extracted.redes_instagram;
  if (extracted.redes_tiktok) updated.redes_sociales.tiktok = extracted.redes_tiktok;
  if (extracted.redes_youtube) updated.redes_sociales.youtube = extracted.redes_youtube;

  return updated;
}
