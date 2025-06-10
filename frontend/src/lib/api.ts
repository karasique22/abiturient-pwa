// api.ts
import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND,
  withCredentials: true, // браузер будет слать access/refresh куки автоматически
});

/**
 * ─────────────────────────────────────────────
 *  REQUEST-ИНТЕРСЕПТОР
 * ─────────────────────────────────────────────
 *
 * Если вы храните токен **только** в http-only cookie,
 * заголовок Authorization добавлять не нужно ─ убираем его совсем.
 * (Оставьте интерсептор пустым, если нужно логировать запросы,
 *  или удалите, если не нужен.)
 */
api.interceptors.request.use((cfg) => cfg);

/**
 * ─────────────────────────────────────────────
 *  RESPONSE-ИНТЕРСЕПТОР (обновление access-token)
 * ─────────────────────────────────────────────
 *
 * Алгоритм:
 *  • Любой 401 ⇒ пробуем вызвать /auth/refresh
 *    (refreshToken уйдёт в cookie).
 *  • Если /auth/refresh вернул 200 и выставил Set-Cookie
 *    с новым accessToken, повторяем исходный запрос.
 *  • Если /auth/refresh тоже 401/403 ⇒ оба токена протухли,
 *    отправляем пользователя на страницу логина.
 */
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // не 401 → отдать ошибку дальше
    if (error.response?.status !== 401) {
      throw error;
    }

    try {
      // пытаемся обновить accessToken
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND}/auth/refresh`,
        {}, // тело не нужно, refreshToken в cookie
        { withCredentials: true } // чтобы куки ушли и Set-Cookie принялся
      );

      // повторяем оригинальный запрос
      if (error.config) {
        return api.request(error.config);
      }
    } catch (refreshErr) {
      // refresh не помог → токены недействительны
      // отправляем на логин (или можете показать модалку)
      window.location.href = '/auth/login';
    }

    throw error; // пробрасываем исходную ошибку наверх
  }
);

export default api;
