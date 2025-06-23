'use client';

import { useEffect, useRef, useState } from 'react';

export const useToastManager = (delay = 3_000) => {
  const [toasts, setToasts] = useState<Record<string, string>>({});

  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const push = (field: string, msg: string) => {
    setToasts((prev) => ({ ...prev, [field]: msg }));

    clearTimeout(timers.current[field]);
    timers.current[field] = setTimeout(() => remove(field), delay);
  };

  const remove = (field: string) => {
    clearTimeout(timers.current[field]);
    delete timers.current[field];
    setToasts((prev) => {
      const copy = { ...prev };
      delete copy[field];
      return copy;
    });
  };

  useEffect(() => {
    return () => {
      Object.values(timers.current).forEach(clearTimeout);
      timers.current = {};
    };
  }, []);

  return { toasts, push, remove };
};
