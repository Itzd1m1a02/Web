import { getAccessToken } from './auth';

const BASE_URL = 'http://127.0.0.1:8000/api';

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = getAccessToken();
  
  const headers = new Headers(options.headers);
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });
}