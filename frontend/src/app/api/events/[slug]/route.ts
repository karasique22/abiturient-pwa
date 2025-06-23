import { proxy } from '@/app/api/proxy';

export async function GET(req: Request) {
  const { pathname } = new URL(req.url);
  const slug = pathname.split('/').pop();
  const url = `${process.env.NEXT_PUBLIC_BACKEND}/events/${slug}`;
  return proxy(req, url);
}
