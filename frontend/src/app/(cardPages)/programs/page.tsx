import ClientPrograms from './ClientPrograms';
import api from '@/lib/api';
import { ApiRequestConfig } from '@/types';
import type { ProgramApi } from '@/types';

export default async function ProgramsPage() {
  const cfg: ApiRequestConfig = { skipAuthRefresh: true };
  const { data } = await api.get<ProgramApi[]>('/programs', cfg);
  return <ClientPrograms programs={data ?? []} />;
}
