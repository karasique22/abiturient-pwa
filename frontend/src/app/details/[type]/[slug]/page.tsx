import { notFound } from 'next/navigation';
import EventDetails from '@/app/details/EventDetails';
import ProgramDetails from '@/app/details/ProgramDetails';
import api, { ApiRequestConfig } from '@/lib/api';

type RouteParams = { type: 'event' | 'program'; slug: string };

export default async function Page(props: { params: Promise<RouteParams> }) {
  const { type, slug } = await Promise.resolve(await props.params);

  if (type !== 'event' && type !== 'program') return notFound();

  const cfg: ApiRequestConfig = { skipAuthRefresh: true };
  const { data, status } = await api.get(`/${type}s/${slug}`, cfg);
  if (status !== 200) return notFound();

  return type === 'event' ? (
    <EventDetails data={data} />
  ) : (
    <ProgramDetails data={data} />
  );
}
