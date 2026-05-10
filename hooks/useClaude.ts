/**
 * useClaude Hook — Mundo Aimas
 * Integración con Claude API para generación profunda de prompts.
 * 
 * NOTA: Claude API requiere un backend proxy (ANTHROPIC_API_KEY no tiene
 * prefijo VITE_ por seguridad). Cuando se implemente Netlify Functions,
 * este hook llamará al endpoint serverless.
 * 
 * Por ahora, la generación de prompts se hace localmente con prompt-generator.ts.
 */

import { useCallback } from 'react';
import type { OnboardingData, PromptsMaestros } from '../types/database';
import { generateMasterPrompts } from '../lib/prompt-generator';

export function useClaude() {
  /**
   * Genera los 3 prompts maestros a partir de los datos del onboarding.
   * Usa generación local por ahora; cuando esté disponible el backend,
   * llamará a Claude para prompts más sofisticados.
   */
  const generatePrompts = useCallback(async (data: OnboardingData): Promise<PromptsMaestros> => {
    // TODO: Cuando Netlify Functions esté configurado, llamar a:
    // const response = await fetch('/.netlify/functions/generate-prompts', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    // });
    // return response.json();

    // Generación local por ahora
    return generateMasterPrompts(data);
  }, []);

  return { generatePrompts };
}

export default useClaude;
