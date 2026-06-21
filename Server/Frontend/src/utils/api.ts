// Em desenvolvimento, se a variável não existir, usamos '/api' para o proxy do Vite funcionar.
// Em produção no Render, o painel vai injetar a URL real da API aqui.
const API_URL = import.meta.env.VITE_API_URL || '';
const BASE_URL = API_URL ? `${API_URL}/api` : '/api';

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const headers = new Headers(options.headers);
  
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  return fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include', // Essencial para os Cookies HttpOnly funcionarem cross-origin
  });
}