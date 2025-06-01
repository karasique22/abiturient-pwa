import axios from 'axios';

export const useAuth = () => {
  const API = process.env.API;
  const refresh = async () => {
    const refreshToken = localStorage.getItem('refresh');
    if (!refreshToken) return logout();
    const {
      accessToken,
      refreshToken: newRefresh,
      role,
    } = await axios
      .post(`${API}/auth/refresh`, { refreshToken })
      .then((r) => r.data);

    localStorage.setItem('token', accessToken);
    localStorage.setItem('refresh', newRefresh);
    if (role) localStorage.setItem('role', role);
  };

  const logout = () => {
    localStorage.clear();
  };

  return { refresh, logout };
};
