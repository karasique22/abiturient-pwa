import { notFound } from 'next/navigation';
import GenericDetails from '@/app/details/GenericDetails';

type RouteParams = { type: 'event' | 'program'; slug: string };

export default async function Page(props: { params: Promise<RouteParams> }) {
  const { type, slug } = await Promise.resolve(await props.params);

  if (type !== 'event' && type !== 'program') return notFound();

  // FIXME: использовать useFetch
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND}/${type}s/${slug}`,
    { cache: 'no-store' }
  );
  if (!res.ok) return notFound();
  const data = await res.json();

  return <GenericDetails type={type} data={data} />;
}
