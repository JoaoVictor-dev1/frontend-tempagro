/**
 * Configuração central de acesso à API.

 * Os valores abaixo (depois do "||") são só um fallback para
 * desenvolvimento, caso o .env ainda não exista.
 */
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://ambience-tracker-api.onrender.com';

export const API_KEY =
  import.meta.env.VITE_API_KEY || '9c1cb420cafcc3aaa736cb00dc623acc';

export const GALPAO_ID = import.meta.env.VITE_GALPAO_ID || 1;

// Intervalo de atualização automática do dashboard (polling).
export const POLLING_MS = 10000;