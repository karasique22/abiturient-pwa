import { useState, useEffect } from 'react';
import api from '@/lib/api';
import type { EventApi } from '@/types';
import type { Event } from '@prisma/client';

// TODO: объединить с usePrograms

export const useEvents = () => {
  const [events, setEvents] = useState<EventApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get<EventApi[]>('/events');
      setEvents(data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return { events, loading, error, refetch: load };
};
