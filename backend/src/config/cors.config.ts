import { registerAs } from '@nestjs/config';

function toRule(raw: string): string | RegExp {
  const v = raw.trim();
  if (!v) return '';

  if (v.startsWith('/') && v.endsWith('/')) {
    return new RegExp(v.slice(1, -1));
  }

  if (v.includes('*')) {
    const hasScheme = v.startsWith('http://') || v.startsWith('https://');
    const pattern = v
      .replace(/^https?:\/\//, '')
      .replace(/\./g, '\\.')
      .replace(/\*/g, '.*');
    const final = `^https?://${pattern}$`;
    return new RegExp(hasScheme ? '^' + pattern + '$' : final);
  }

  return v;
}

export default registerAs('cors', () => {
  const allowlist = (process.env.CORS_ORIGINS ?? '')
    .split(',')
    .map(toRule)
    .filter(Boolean);

  return {
    credentials: true,
    origin: (
      origin: string | undefined,
      cb: (err: Error | null, ok?: boolean) => void,
    ) => {
      if (!origin) return cb(null, true);
      const ok = allowlist.some((r) =>
        typeof r === 'string' ? r === origin : r.test(origin),
      );
      cb(ok ? null : new Error(`Origin ${origin} not allowed by CORS`), ok);
    },
  };
});
