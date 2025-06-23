import { registerAs } from '@nestjs/config';

export default registerAs('cors', () => {
  const allowlist = (process.env.CORS_ORIGINS ?? '')
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean)
    .map((v) =>
      v.startsWith('/') && v.endsWith('/') ? new RegExp(v.slice(1, -1)) : v,
    );

  return {
    credentials: true,
    origin: (
      origin: string | undefined,
      cb: (e: Error | null, ok?: boolean) => void,
    ) => {
      if (!origin) return cb(null, true);
      const ok = allowlist.some((rule) =>
        typeof rule === 'string' ? rule === origin : rule.test(origin),
      );
      ok
        ? cb(null, true)
        : cb(new Error(`Origin ${origin} not allowed by CORS`));
    },
  };
});
