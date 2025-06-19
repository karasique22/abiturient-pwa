'use client';

import { useState } from 'react';
import useSWR from 'swr';
import api from '@/lib/api';
import { ApplicationApi, ApiRequestConfig } from '@/types';

interface UseApplicationsOptions {
  skipAuthRefresh?: boolean;
}

export function useApplications(
  type: 'events' | 'programs',
  options?: UseApplicationsOptions
) {
  const [mutating, setMutating] = useState(false);

  const fetcher = (url: string) =>
    api
      .get(url, {
        skipAuthRefresh: options?.skipAuthRefresh,
      } as ApiRequestConfig)
      .then((res) => res.data);

  const { data, error, mutate, isLoading } = useSWR<ApplicationApi[]>(
    `/applications/my-${type}`,
    fetcher
  );

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
