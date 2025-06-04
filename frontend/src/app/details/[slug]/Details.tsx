'use client';

import { useFetch } from '@/hooks/useFetch';
import { notFound } from 'next/navigation';
import type { Event } from '@prisma/client';

export default function ClientEventDetails({ slug }: { slug: string }) {
  const { data, loading, error } = useFetch<Event, Event>(`/events/${slug}`);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {String(error)}</p>;
  if (!data) return notFound();

  return (
    <div>
      <h1>Подробности о событии</h1>
      <p>Название: {data.title}</p>
      <p>Описание: {data.description}</p>
      <p>Дата: {new Date(data.dateTime).toLocaleString()}</p>
      <p>Место: {data.address}</p>
      <p>Куратор: {data.curatorName}</p>
    </div>
  );
}
