/**
 * Generador de los 3 Prompts Maestros
 * Transforma los datos del onboarding en prompts estructurados.
 */

import type { OnboardingData, PromptsMaestros } from '../types/database';

/**
 * PROMPT 1: Información técnica del negocio
 * Usado para: navegación en Mundo Aimas, SEO, datos de contacto
 */
function generatePromptInfo(data: OnboardingData): string {
  return `=== INFORMACIÓN TÉCNICA DEL COMERCIO ===
NOMBRE DEL NEGOCIO: ${data.nombre_negocio}
PROPIETARIO: ${data.nombre_usuario}
CATEGORÍA: ${data.categoria}
DESCRIPCIÓN: ${data.descripcion}

UBICACIÓN:
- Ciudad: ${data.ciudad}
- Dirección: ${data.direccion}

CONTACTO:
- Teléfono: ${data.telefono}
- WhatsApp: ${data.whatsapp}

PRODUCTOS/SERVICIOS PRINCIPALES:
${data.productos_servicios}

REDES SOCIALES:
${data.redes_sociales.facebook ? `- Facebook: ${data.redes_sociales.facebook}` : ''}
${data.redes_sociales.instagram ? `- Instagram: ${data.redes_sociales.instagram}` : ''}
${data.redes_sociales.tiktok ? `- TikTok: ${data.redes_sociales.tiktok}` : ''}
${data.redes_sociales.youtube ? `- YouTube: ${data.redes_sociales.youtube}` : ''}
`.trim();
}

/**
 * PROMPT 2: Diseño y branding
 * Usado para: generación del sitio web, identidad visual
 */
function generatePromptDiseno(data: OnboardingData): string {
  return `=== DISEÑO E IDENTIDAD VISUAL ===
NEGOCIO: ${data.nombre_negocio}
CATEGORÍA: ${data.categoria}

ESTILO VISUAL PREFERIDO: ${data.estilo_visual}
COLORES PREFERIDOS: ${data.colores}

CONTEXTO PARA DISEÑO:
El negocio "${data.nombre_negocio}" es un establecimiento de tipo "${data.categoria}"
ubicado en ${data.ciudad}. ${data.descripcion}

INSTRUCCIONES DE DISEÑO:
- Aplicar estilo ${data.estilo_visual} a todos los componentes
- Usar los colores ${data.colores} como paleta principal
- El Hero Section debe reflejar la esencia del negocio
- El diseño debe ser responsive y mobile-first
- Aplicar efectos glassmorphism donde sea apropiado
`.trim();
}

/**
 * PROMPT 3: Contexto IA y memoria del chatbot
 * Usado para: el agente IA comercial de cada tienda
 */
function generatePromptContextoIA(data: OnboardingData): string {
  return `=== CONTEXTO IA — AGENTE COMERCIAL ===
Eres el asistente virtual de "${data.nombre_negocio}".

IDENTIDAD:
- Nombre del negocio: ${data.nombre_negocio}
- Propietario: ${data.nombre_usuario}
- Categoría: ${data.categoria}
- Ubicación: ${data.direccion}, ${data.ciudad}

CATÁLOGO:
${data.productos_servicios}

DESCRIPCIÓN DEL NEGOCIO:
${data.descripcion}

CONTACTO DIRECTO:
- WhatsApp: ${data.whatsapp}
- Teléfono: ${data.telefono}

REGLAS DE COMPORTAMIENTO:
1. Respuestas MUY cortas y puntuales (1-3 oraciones máximo)
2. Tono amigable y profesional
3. NUNCA menciones el nombre de los emojis, solo úsalos
4. Siempre recuerda el nombre del cliente
5. Si el cliente pide un producto/servicio, muéstralo visualmente
6. Si el cliente quiere comprar, guíalo al carrito o WhatsApp
7. Si no sabes algo, dirige al cliente al WhatsApp del dueño
8. Habla siempre en español
9. No inventes información que no tengas
10. Sé proactivo sugiriendo productos/servicios relevantes
`.trim();
}

/**
 * Genera los 3 prompts maestros a partir de los datos del onboarding.
 */
export function generateMasterPrompts(data: OnboardingData): PromptsMaestros {
  return {
    prompt_info: generatePromptInfo(data),
    prompt_diseno: generatePromptDiseno(data),
    prompt_contexto_ia: generatePromptContextoIA(data),
  };
}

export default generateMasterPrompts;
