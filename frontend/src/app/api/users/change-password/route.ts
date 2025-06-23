import { proxy } from '@/app/api/proxy';

export async function PATCH(req: Request) {
  return proxy(req, `${process.env.NEXT_PUBLIC_BACKEND}/users/change-password`);
}
