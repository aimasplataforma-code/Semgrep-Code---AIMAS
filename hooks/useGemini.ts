/**
 * useGemini Hook — Mundo Aimas
 * Comunicación con Gemini 2.0 Flash para el chat de onboarding.
 */

import { useState, useCallback, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;

/** System prompt para la IA Arquitecta de onboarding */
const ONBOARDING_SYSTEM_PROMPT = `Eres Aimas, la IA Arquitecta de Mundo Aimas 🏗️

Tu misión: dar la bienvenida a nuevos dueños de negocios y recopilar su información para crear su presencia digital.

PERSONALIDAD:
- Amigable y profesional
- Mensajes MUY cortos (1-3 oraciones máximo)
- Una sola pregunta por mensaje
- Usa emojis naturalmente pero NUNCA escribas el nombre del emoji
- Celebra brevemente cada respuesta
- Habla siempre en español

INFORMACIÓN A RECOPILAR (sigue este orden aproximado):
1. Nombre del dueño
2. Nombre del negocio
3. Categoría/tipo de negocio
4. Ciudad
5. Dirección completa
6. Teléfono
7. WhatsApp
8. Breve descripción del negocio
9. Principales productos o servicios
10. Estilo visual preferido (moderno, clásico, minimalista, colorido)
11. Colores preferidos
12. Redes sociales (Facebook, Instagram, TikTok, YouTube)

REGLAS:
- NO preguntes más de una cosa a la vez
- NO hagas mensajes largos
- SÍ celebra brevemente cada respuesta antes de la siguiente pregunta
- Si el usuario da información extra, reconócela y aprovéchala
- Adapta la siguiente pregunta al contexto
- Si el usuario no tiene algo (ej: redes sociales), está bien, continúa

CUANDO TENGAS TODA LA INFORMACIÓN:
Haz un resumen breve y amigable confirmando los datos principales.
Termina diciendo que su espacio digital está siendo creado.
Incluye la marca [ONBOARDING_COMPLETE] al final de tu último mensaje.`;

interface GeminiMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export function useGemini() {
  const [isLoading, setIsLoading] = useState(false);
  const historyRef = useRef<GeminiMessage[]>([]);
  const clientRef = useRef<GoogleGenAI | null>(null);

  // Lazy init del cliente
  const getClient = useCallback(() => {
    if (!clientRef.current && API_KEY) {
      clientRef.current = new GoogleGenAI({ apiKey: API_KEY });
    }
    return clientRef.current;
  }, []);

  /**
   * Envía un mensaje al chat de onboarding y retorna la respuesta.
   */
  const sendMessage = useCallback(async (userMessage: string): Promise<string> => {
    const client = getClient();
    if (!client) throw new Error('Gemini API key no configurada');

    setIsLoading(true);

    try {
      // Agregar mensaje del usuario al historial
      historyRef.current.push({
        role: 'user',
        parts: [{ text: userMessage }],
      });

      const response = await client.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: historyRef.current,
        config: {
          systemInstruction: ONBOARDING_SYSTEM_PROMPT,
          maxOutputTokens: 300,
          temperature: 0.7,
        },
      });

      const text = response.text ?? 'Lo siento, hubo un error. ¿Puedes repetir?';

      // Agregar respuesta al historial
      historyRef.current.push({
        role: 'model',
        parts: [{ text }],
      });

      return text;
    } catch (err) {
      console.error('Gemini error:', err);
      return 'Disculpa, tuve un problema técnico. ¿Puedes repetir tu respuesta? 🔧';
    } finally {
      setIsLoading(false);
    }
  }, [getClient]);

  /**
   * Extrae datos estructurados de la conversación usando Gemini.
   */
  const extractData = useCallback(async (conversation: string): Promise<Record<string, string>> => {
    const client = getClient();
    if (!client) return {};

    try {
      const response = await client.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [{
          role: 'user',
          parts: [{ text: `Analiza esta conversación y extrae los datos del negocio en JSON.\nSolo incluye campos que el usuario haya mencionado explícitamente.\nResponde SOLO con JSON válido, sin markdown.\n\nConversación:\n${conversation}` }],
        }],
        config: {
          systemInstruction: 'Eres un extractor de datos. Responde ÚNICAMENTE con un JSON válido con los campos: nombre_usuario, nombre_negocio, categoria, ciudad, direccion, telefono, whatsapp, descripcion, productos_servicios, estilo_visual, colores, redes_facebook, redes_instagram, redes_tiktok, redes_youtube. Solo incluye campos mencionados.',
          maxOutputTokens: 500,
          temperature: 0.1,
        },
      });

      const text = response.text?.trim() ?? '{}';
      // Limpiar posible markdown
      const clean = text.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
      return JSON.parse(clean);
    } catch {
      return {};
    }
  }, [getClient]);

  /**
   * Genera el saludo inicial de la IA.
   */
  const getGreeting = useCallback(async (): Promise<string> => {
    const client = getClient();
    if (!client) return '¡Hola! 👋 Soy Aimas, tu arquitecta digital. ¿Cómo te llamas?';

    setIsLoading(true);
    try {
      const response = await client.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [{
          role: 'user',
          parts: [{ text: 'Inicia el onboarding. Saluda al nuevo usuario y pregúntale su nombre.' }],
        }],
        config: {
          systemInstruction: ONBOARDING_SYSTEM_PROMPT,
          maxOutputTokens: 150,
          temperature: 0.8,
        },
      });

      const text = response.text ?? '¡Hola! 👋 Soy Aimas, tu arquitecta digital. ¿Cómo te llamas?';

      // Inicializar historial con el saludo
      historyRef.current = [{
        role: 'model',
        parts: [{ text }],
      }];

      return text;
    } catch {
      return '¡Hola! 👋 Soy Aimas, tu arquitecta digital en Mundo Aimas. ¿Cómo te llamas?';
    } finally {
      setIsLoading(false);
    }
  }, [getClient]);

  /** Resetea el historial de conversación */
  const resetHistory = useCallback(() => {
    historyRef.current = [];
  }, []);

  return {
    sendMessage,
    extractData,
    getGreeting,
    resetHistory,
    isLoading,
  };
}

export default useGemini;
