'use client';

import { useFetch } from '@/hooks/useFetch';
import { notFound, useSearchParams } from 'next/navigation';
import Loader from '@/components/Loader/Loader';
import { useRouter } from 'next/navigation';

import type { EventApi, ProgramApi } from '@/types';

import ProgramDetails from './ProgramDetails';
import EventDetails from './EventDetails';

export default function Details({ slug }: { slug: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get('type') === 'program' ? 'program' : 'event';

  const { data, loading, error } = useFetch<EventApi | ProgramApi>(
    `/${type}s/${slug}`
  );

  const commonProps = {
    loading,
    error,
    onBack: () => router.back(),
  };

  if (loading) return <Loader />;
  if (error) return <p>Ошибка: {String(error)}</p>;
  if (!data) return notFound();

  if (type === 'program') {
    return (
      <ProgramDetails
        {...commonProps}
        data={data as ProgramApi}
        onBack={() => router.back()}
      />
    );
  }

  return (
    <EventDetails
      {...commonProps}
      data={data as EventApi}
      onBack={() => router.back()}
    />
  );
}
