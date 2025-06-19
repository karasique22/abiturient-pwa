import api, { ApiRequestConfig } from './api';
import { AxiosError } from 'axios';

export async function getMe(cfg?: ApiRequestConfig) {
  try {
    const config: ApiRequestConfig = { skipAuthRefresh: true, ...(cfg ?? {}) };
    const { data } = await api.get('/users/me', config);
    return data as { role: string | null; user: any };
  } catch (err) {
    if ((err as AxiosError).response?.status === 401) return null;
    return null; // сеть упала -> считаем гостем
  }
}
