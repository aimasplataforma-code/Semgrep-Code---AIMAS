/**
 * useOnboarding Hook — Mundo Aimas
 * Orquesta el flujo de onboarding: chat + extracción + persistencia.
 */

import { useState, useCallback, useRef } from 'react';
import type { ChatMessage, OnboardingData, PromptsMaestros } from '../types/database';
import { useGemini } from './useGemini';
import { useClaude } from './useClaude';
import { useAuth } from './useAuth';
import { supabase } from '../lib/supabase';
import {
  createEmptyOnboardingData,
  mergeExtractedData,
  getCompletionPercentage,
  generateSlug,
} from '../lib/onboarding-parser';

type OnboardingStatus = 'welcome' | 'chatting' | 'saving' | 'complete' | 'error';

export function useOnboarding() {
  const { user } = useAuth();
  const { sendMessage, extractData, getGreeting, isLoading: geminiLoading } = useGemini();
  const { generatePrompts } = useClaude();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [data, setData] = useState<OnboardingData>(createEmptyOnboardingData());
  const [status, setStatus] = useState<OnboardingStatus>('welcome');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const msgIdCounter = useRef(0);
  const dataRef = useRef<OnboardingData>(createEmptyOnboardingData());

  const createMsg = useCallback((role: 'user' | 'assistant', content: string): ChatMessage => {
    msgIdCounter.current += 1;
    return { id: `msg-${msgIdCounter.current}`, role, content, timestamp: new Date() };
  }, []);

  /** Inicia el onboarding con el saludo de la IA */
  const startOnboarding = useCallback(async () => {
    setStatus('chatting');
    const greeting = await getGreeting();
    setMessages([createMsg('assistant', greeting)]);
  }, [getGreeting, createMsg]);

  /** Persiste todos los datos en Supabase */
  const finalizeOnboarding = useCallback(async () => {
    if (!user) return;
    setStatus('saving');
    setError('');

    try {
      const currentData = dataRef.current;
      const prompts: PromptsMaestros = await generatePrompts(currentData);
      const slug = generateSlug(currentData.nombre_negocio || 'mi-negocio');

      // 1. Crear comercio
      const { data: comercio, error: comError } = await supabase
        .from('comercios')
        .insert({
          usuario_id: user.id,
          nombre: currentData.nombre_negocio,
          slug,
          categoria: currentData.categoria,
          descripcion: currentData.descripcion,
          direccion: currentData.direccion,
          ciudad: currentData.ciudad,
          telefono: currentData.telefono,
          whatsapp: currentData.whatsapp,
          activo: true,
          plan: 'basico',
        })
        .select()
        .single();

      if (comError) throw comError;
      const comercioId = comercio.id;

      // 2. Crear contexto IA
      await supabase.from('contexto_ia').insert({
        comercio_id: comercioId,
        personalidad: 'amigable y profesional',
        tono: 'amigable',
        prompt_maestro: prompts.prompt_contexto_ia,
        base_conocimiento: prompts.prompt_info,
        reglas_comportamiento: 'Respuestas cortas. No mencionar nombres de emojis. Siempre en español.',
      });

      // 3. Crear diseño
      await supabase.from('diseno').insert({
        comercio_id: comercioId,
        plantilla: 'default',
        paleta_colores: {
          primario: currentData.colores || '#8b5cf6',
          estilo: currentData.estilo_visual || 'moderno',
        },
      });

      // 4. Crear redes sociales
      await supabase.from('redes_sociales').insert({
        comercio_id: comercioId,
        facebook: currentData.redes_sociales.facebook || null,
        instagram: currentData.redes_sociales.instagram || null,
        whatsapp: currentData.whatsapp || null,
        tiktok: currentData.redes_sociales.tiktok || null,
        youtube: currentData.redes_sociales.youtube || null,
      });

      // 5. Actualizar nombre del usuario
      await supabase.from('usuarios').update({
        nombre: currentData.nombre_usuario,
      }).eq('id', user.id);

      setProgress(100);
      setStatus('complete');
    } catch (err: unknown) {
      console.error('Error saving onboarding:', err);
      setError(err instanceof Error ? err.message : 'Error al guardar los datos');
      setStatus('error');
    }
  }, [user, generatePrompts]);

  /** Envía un mensaje del usuario y recibe respuesta de la IA */
  const sendUserMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    // Agregar mensaje del usuario
    const userMsg = createMsg('user', text);
    setMessages(prev => [...prev, userMsg]);

    // Obtener respuesta de Gemini
    const response = await sendMessage(text);
    const aiMsg = createMsg('assistant', response);
    setMessages(prev => [...prev, aiMsg]);

    // Extraer datos de la conversación (fuera del state setter)
    try {
      const allMessages = [...messages, userMsg, aiMsg];
      const fullConversation = allMessages
        .map(m => `${m.role === 'user' ? 'Usuario' : 'Aimas'}: ${m.content}`)
        .join('\n');

      const extracted = await extractData(fullConversation);
      if (extracted && Object.keys(extracted).length > 0) {
        setData(current => {
          const updated = mergeExtractedData(current, extracted);
          dataRef.current = updated;
          setProgress(getCompletionPercentage(updated));
          return updated;
        });
      }
    } catch (extractErr) {
      console.warn('Data extraction failed:', extractErr);
    }

    // Verificar si el onboarding se completó
    if (response.includes('[ONBOARDING_COMPLETE]')) {
      await finalizeOnboarding();
    }
  }, [sendMessage, extractData, createMsg, messages, finalizeOnboarding]);

  /** Forzar completar el onboarding manualmente */
  const forceComplete = useCallback(async () => {
    await finalizeOnboarding();
  }, [finalizeOnboarding]);

  return {
    messages,
    data,
    status,
    progress,
    error,
    isLoading: geminiLoading,
    startOnboarding,
    sendUserMessage,
    forceComplete,
  };
}

export default useOnboarding;
