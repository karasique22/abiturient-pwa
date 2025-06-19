'use client';

import { useState } from 'react';
import useSWR from 'swr';
import api from '@/lib/api';
import { ApplicationApi } from '@/types';

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export function useApplications(type: 'events' | 'programs') {
  const { data, error, mutate, isLoading } = useSWR<ApplicationApi[]>(
    `/applications/my-${type}`,
    fetcher
  );

  const [mutating, setMutating] = useState(false);

  const createApplication = async (payload: Record<string, string>) => {
    setMutating(true);
    try {
      const { data: app } = await api.post('/applications', payload);
      await mutate();
      return app as ApplicationApi;
    } finally {
      setMutating(false);
    }
  };

  const cancelApplication = async (id: string) => {
    setMutating(true);
    try {
      await api.patch(`/applications/${id}/cancel`);
      await mutate();
    } finally {
      setMutating(false);
    }
  };

  return {
    applications: data ?? [],
    isLoading,
    error,
    mutate,
    mutating,
    createApplication,
    cancelApplication,
  };
}
