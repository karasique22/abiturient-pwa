import { proxy } from '@/app/api/proxy';

export async function POST(req: Request) {
  return proxy(req, `${process.env.NEXT_PUBLIC_BACKEND}/auth/logout`);
}
