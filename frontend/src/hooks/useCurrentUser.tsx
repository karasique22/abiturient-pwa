'use client';

import useSWR from 'swr';
import { getMe } from '@/lib/getMe';
import { UserApi } from '@/types';

export function useCurrentUser() {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    '/users/me',
    () => getMe()
  );

  const loading = isLoading || isValidating || data === undefined;

  return {
    user: (data?.user as UserApi) ?? null,
    role: (data?.role as 'student' | 'moderator' | 'admin' | null) ?? null,
    loading,
    error,
    mutate,
  };
}
