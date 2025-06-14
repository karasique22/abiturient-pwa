import { proxy } from '@/app/api/proxy';

// FIXME: чето с этим сделать

export async function POST(req: Request) {
  return proxy(req, `${process.env.NEXT_PUBLIC_BACKEND}/auth/register`);
}
