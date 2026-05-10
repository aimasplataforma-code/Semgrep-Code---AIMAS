/**
 * Auth Guard Utilities
 * Funciones para verificar el estado de autenticación y onboarding.
 */

import { supabase } from './supabase';
import type { Comercio } from '../types/database';

/** Posibles estados de la aplicación */
export type AppScreen = 'loading' | 'auth' | 'onboarding' | 'main';

/**
 * Verifica si el usuario actual tiene un comercio registrado (onboarding completado).
 * Retorna el comercio si existe, null si no.
 */
export async function checkOnboardingStatus(userId: string): Promise<Comercio | null> {
  const { data, error } = await supabase
    .from('comercios')
    .select('*')
    .eq('usuario_id', userId)
    .single();

  if (error || !data) return null;
  return data as Comercio;
}

/**
 * Determina qué pantalla mostrar basándose en el estado del usuario.
 */
export async function determineScreen(userId: string | null): Promise<AppScreen> {
  if (!userId) return 'auth';

  const comercio = await checkOnboardingStatus(userId);
  if (!comercio) return 'onboarding';

  return 'main';
}

/**
 * Crea o actualiza el perfil del usuario en la tabla 'usuarios'.
 */
export async function upsertUserProfile(
  userId: string,
  email: string,
  nombre?: string,
  googleId?: string
): Promise<void> {
  await supabase.from('usuarios').upsert(
    {
      id: userId,
      email,
      nombre: nombre || null,
      google_id: googleId || null,
    },
    { onConflict: 'id' }
  );
}
