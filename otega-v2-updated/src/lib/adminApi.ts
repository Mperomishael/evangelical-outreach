// Admin data-access layer — every call goes through /api/admin/* which
// uses the Supabase service-role key server-side. Auth is a simple
// x-admin-token header (see api/_lib/auth.js), stored in localStorage.

const TOKEN_KEY = 'otega_admin_token';
const USER_KEY = 'otega_admin_user';

export interface AdminUser {
  id?: string;
  username: string;
  displayName: string;
  isSuper: boolean;
  canUpload: boolean;
  canPublish: boolean;
  canEdit: boolean;
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getCurrentUser(): AdminUser | null {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function isLoggedIn(): boolean {
  return Boolean(getToken());
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export async function login(username: string, password: string): Promise<AdminUser> {
  const res = await fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Login failed');
  localStorage.setItem(TOKEN_KEY, json.token);
  localStorage.setItem(USER_KEY, JSON.stringify(json.user));
  return json.user;
}

async function request<T = any>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const res = await fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'x-admin-token': token } : {}),
      ...(options.headers || {}),
    },
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (res.status === 401) logout();
    throw new Error(json.error || `Request failed (${res.status})`);
  }
  return json;
}

// ---- Generic resource CRUD (evangelists, blog_posts, testimonies, etc.) ----
export const list = <T = any>(resource: string) =>
  request<{ data: T[] }>(`/api/admin/${resource}`).then((r) => r.data);

export const create = <T = any>(resource: string, payload: Partial<T>) =>
  request<{ data: T }>(`/api/admin/${resource}`, { method: 'POST', body: JSON.stringify(payload) }).then((r) => r.data);

export const update = <T = any>(resource: string, id: string, payload: Partial<T>) =>
  request<{ data: T }>(`/api/admin/${resource}/${id}`, { method: 'PATCH', body: JSON.stringify(payload) }).then((r) => r.data);

export const remove = (resource: string, id: string) =>
  request<{ ok: true }>(`/api/admin/${resource}/${id}`, { method: 'DELETE' });

// ---- Settings ----
export const getAdminSettings = () => request<{ data: any }>('/api/admin/settings').then((r) => r.data);
export const updateAdminSettings = (payload: Record<string, any>) =>
  request<{ data: any }>('/api/admin/settings', { method: 'PATCH', body: JSON.stringify(payload) }).then((r) => r.data);

// ---- Dashboard stats ----
export const getDashboardStats = () => request<{ data: any }>('/api/admin/dashboard').then((r) => r.data);

// ---- Sub-admin users (super admin only) ----
export const listAdminUsers = () => request<{ data: any[] }>('/api/admin/users').then((r) => r.data);
export const createAdminUser = (payload: any) =>
  request<{ data: any }>('/api/admin/users', { method: 'POST', body: JSON.stringify(payload) }).then((r) => r.data);
export const updateAdminUser = (id: string, payload: any) =>
  request<{ data: any }>(`/api/admin/users?id=${id}`, { method: 'PATCH', body: JSON.stringify(payload) }).then((r) => r.data);
export const deleteAdminUser = (id: string) => request<{ ok: true }>(`/api/admin/users?id=${id}`, { method: 'DELETE' });

// ---- File upload (small files, base64 JSON body) ----
export async function uploadFile(file: File, folder = 'uploads'): Promise<{ url: string; path: string }> {
  const dataBase64 = await fileToBase64(file);
  const res = await request<{ url: string; path: string }>('/api/admin/upload', {
    method: 'POST',
    body: JSON.stringify({ filename: file.name, contentType: file.type, dataBase64, folder }),
  });
  return res;
}

// ---- Large-file upload via signed URL (videos) ----
export async function uploadLargeFile(file: File, folder = 'videos'): Promise<{ url: string; path: string }> {
  const token = getToken();
  const signRes = await fetch('/api/admin/upload-signed-url', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(token ? { 'x-admin-token': token } : {}) },
    body: JSON.stringify({ filename: file.name, folder }),
  });
  const signed = await signRes.json();
  if (!signRes.ok) throw new Error(signed.error || 'Could not get upload URL');

  const putRes = await fetch(signed.signedUrl, { method: 'PUT', body: file, headers: { 'Content-Type': file.type } });
  if (!putRes.ok) throw new Error('Upload failed');
  return { url: signed.publicUrl, path: signed.path };
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = () => reject(new Error('Could not read file'));
    reader.readAsDataURL(file);
  });
}
