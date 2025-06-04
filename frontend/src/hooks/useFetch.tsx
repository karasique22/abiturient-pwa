'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';

export function useFetch<T, R = T[]>(url: string) {
  const [data, setData] = useState<R | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<R>(url);
      setData(response.data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [url]);

  return { data, loading, error, refetch: load };
}
