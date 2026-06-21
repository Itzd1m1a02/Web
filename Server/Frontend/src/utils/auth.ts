// REMOVIDO: export const ACCESS_TOKEN_KEY = 'access_token';
export const USER_KEY = 'usuario';

export function getUsuario(): string | null {
  return localStorage.getItem(USER_KEY);
}

// O React agora sabe que está logado apenas verificando se o nome do usuário existe
export function isAuthenticated(): boolean {
  return Boolean(getUsuario());
}

export function saveAuthData(usuario: string): void {
  localStorage.setItem(USER_KEY, usuario);
}

export function clearAuthData(): void {
  localStorage.removeItem(USER_KEY);
}

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
}