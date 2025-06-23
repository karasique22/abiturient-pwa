import api from './api';
import { ApiRequestConfig } from '@/types';
import { AxiosError } from 'axios';

export async function getMe(cfg?: ApiRequestConfig) {
  try {
    const config: ApiRequestConfig = { skipAuthRefresh: true, ...(cfg ?? {}) };
    const { data } = await api.get('/users/me', config);

    const role = data?.roles?.[0]?.name ?? null;

    return {
      user: data,
      role: role as 'student' | 'moderator' | 'admin' | null,
    };
  } catch (err) {
    if ((err as AxiosError).response?.status === 401) return null;
    return null;
  }
}
