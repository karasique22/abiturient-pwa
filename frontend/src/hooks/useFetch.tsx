'use client';

import useSWR from 'swr';
import api from '@/lib/api';

export function useFetch<T>(url: string) {
  const { data, error, isLoading, mutate } = useSWR<T>(
    url,
    () => api.get(url).then((res) => res.data),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  return {
    data: data ?? null,
    error,
    loading: isLoading,
    refetch: () => mutate(),
  };
}
