import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND,
  withCredentials: true,
});

api.interceptors.request.use((cfg) => cfg);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status !== 401) {
      throw error;
    }

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND}/auth/refresh`,
        {},
        { withCredentials: true }
      );

      if (error.config) {
        return api.request(error.config);
      }
    } catch (refreshErr) {
      window.location.href = '/auth/login';
    }

    throw error;
  }
);

export default api;
