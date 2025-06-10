'use client';

import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

type Role = 'student' | 'moderator' | 'admin';

export function useAuth() {
  const router = useRouter();

  /* --------- логин --------- */
  const login = useCallback(async (email: string, password: string) => {
    const { data } = await api.post<{
      accessToken: string;
      refreshToken: string;
      role: Role;
    }>('/auth/login', { email, password });

    localStorage.setItem('token', data.accessToken);
    localStorage.setItem('refresh', data.refreshToken);
    localStorage.setItem('role', data.role);
  }, []);

  /* --------- ручной refresh  --------- */
  const refresh = useCallback(async () => {
    const refreshToken = localStorage.getItem('refresh');
    if (!refreshToken) return logout();

    const { data } = await api.post<{
      accessToken: string;
      refreshToken: string;
      role?: Role;
    }>('/auth/refresh', { refreshToken });

    localStorage.setItem('token', data.accessToken);
    localStorage.setItem('refresh', data.refreshToken);
    if (data.role) localStorage.setItem('role', data.role);
  }, []);

  /* --------- logout --------- */
  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout'); // на сервере чистим сессию
    } catch {
      /* сервер может вернуть 401 — игнорируем */
    } finally {
      localStorage.clear();
      router.push('/auth/login'); // редирект на форму входа
    }
  }, [router]);

  return { login, refresh, logout };
}
