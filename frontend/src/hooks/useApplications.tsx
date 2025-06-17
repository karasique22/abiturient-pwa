'use client';

import useSWR from 'swr';
import api from '@/lib/api';
import { ApplicationApi } from '@/types';

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export function useApplications(type: 'events' | 'programs') {
  const { data, error, mutate, isLoading } = useSWR<ApplicationApi[]>(
    `/applications/my-${type}`,
    fetcher
  );

  return {
    applications: data ?? [],
    isLoading,
    error,
    mutate,
  };
}
