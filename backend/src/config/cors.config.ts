import { registerAs } from '@nestjs/config';

/**
 * Конфигурация CORS, читается через ConfigService
 */
export default registerAs('cors', () => {
  // из ENV получаем список доменов
  const origins = process.env.CORS_ORIGINS?.split(',').map((o) => o.trim());

  return {
    credentials: true,

    /**
     * Если в .env указано несколько адресов, проверяем их динамически.
     * При OPTIONS/GET запросах Nest вернёт ровно тот Origin, который пришёл.
     */
    origin: (
      origin: string,
      cb: (err: Error | null, allow?: boolean) => void,
    ) => {
      if (!origin) return cb(null, true);

      if (!origins || origins.includes(origin)) {
        return cb(null, true);
      }
      cb(new Error(`Origin ${origin} not allowed by CORS`));
    },
  };
});
