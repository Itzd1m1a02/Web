// Use relative URLs so Vite's dev proxy intercepts /api requests
// The proxy (configured in vite.config.ts) will route /api to http://127.0.0.1:8000/api
const BASE_URL = '/api';

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const headers = new Headers(options.headers);
  
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  // Vite's dev proxy will intercept /api requests and route them to the backend.
  // The cookie HttpOnly will be included automatically via credentials: 'include'.
  return fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include',
  });
}