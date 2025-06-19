'use client';

import useSWR from 'swr';
import { getMe } from '@/lib/getMe';

export function useCurrentUser() {
  const { data, error, isLoading, mutate } = useSWR('/users/me', () => getMe());

  return {
    user: data?.user ?? null,
    role: (data?.role as 'student' | 'moderator' | 'admin' | null) ?? null,
    loading: isLoading,
    error,
    mutate,
  };
}
