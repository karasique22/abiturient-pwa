import api from '@/lib/api';

export async function login(email: string, password: string) {
  await api.post('/auth/login', { email, password });
  return getMe();
}

export async function register(
  fullName: string,
  phone: string,
  email: string,
  password: string
) {
  await api.post('/auth/register', { fullName, phone, email, password });
  return login(email, password);
}

export async function logout() {
  await api.post('/auth/logout');
}

export async function getMe() {
  try {
    const { data } = await api.get('/users/me');
    return data as { role: string | null; user: any };
  } catch {
    return null;
  }
}
