import { getMe as fetchMe } from '@/services/authService';

export async function getMe() {
  return fetchMe();
}
