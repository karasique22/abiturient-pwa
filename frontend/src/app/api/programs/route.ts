import { proxy } from '@/app/api/proxy';

export async function GET(req: Request) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND}/programs`;
  return proxy(req, url);
}
