import ClientEvents from './ClientEvents';
import api, { ApiRequestConfig } from '@/lib/api';
import type { EventApi } from '@/types';

export default async function EventsPage() {
  const cfg: ApiRequestConfig = { skipAuthRefresh: true };
  const { data } = await api.get<EventApi[]>('/events', cfg);
  return <ClientEvents events={data ?? []} />;
}
