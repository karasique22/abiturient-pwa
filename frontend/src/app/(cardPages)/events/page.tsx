import ClientEvents from './ClientEvents';
import api from '@/lib/api';
import { ApiRequestConfig } from '@/types';
import type { EventApi } from '@/types';

export default async function EventsPage() {
  const cfg: ApiRequestConfig = { skipAuthRefresh: true };
  const { data } = await api.get<EventApi[]>('/events', cfg);
  return <ClientEvents events={data ?? []} />;
}
