import axios, { AxiosError } from 'axios';
import { ApiRequestConfig } from '@/types';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

api.interceptors.request.use((cfg) => cfg);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const cfg = error.config as ApiRequestConfig | undefined;
    if (error.response?.status !== 401 || cfg?.skipAuthRefresh) {
      throw error;
    }

    try {
      await axios.post(`/api/auth/refresh`, {}, { withCredentials: true });

      if (error.config) {
        return api.request(error.config);
      }
    } catch (refreshErr) {
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
    }

    throw error;
  }
);

export default api;
