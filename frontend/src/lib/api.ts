import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND,
  withCredentials: true,
});

api.interceptors.request.use((cfg) => {
  cfg.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  return cfg;
});

api.interceptors.response.use(
  (r) => r,
  async (err) => {
    if (err.response?.status !== 401) throw err;

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND}/auth/refresh`,
        {
          refreshToken: localStorage.getItem('refresh'),
        }
      );
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('refresh', data.refreshToken);
      err.config.headers['Authorization'] = `Bearer ${data.accessToken}`;
      return api.request(err.config);
    } catch {
      localStorage.clear();
      window.location.href = '/auth/login';
      throw err;
    }
  }
);

export default api;
