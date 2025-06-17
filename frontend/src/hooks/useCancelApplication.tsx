'use client';

import { useState } from 'react';
import api from '@/lib/api';

export function useCancelApplication() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const cancel = async (applicationId: string, onSuccess?: () => void) => {
    setLoading(true);
    setError(null);

    try {
      await api.patch(`/applications/${applicationId}/cancel`);
      onSuccess?.();
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || 'Ошибка');
    } finally {
      setLoading(false);
    }
  };

  return { cancel, loading, error };
}
