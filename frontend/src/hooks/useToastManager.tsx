import { useRef, useState } from 'react';

export const useToastManager = (delay = 3000) => {
  const [toasts, setToasts] = useState<Record<string, string>>({});
  const timers = useRef<Record<string, number>>({});

  const push = (field: string, msg: string) => {
    setToasts((p) => ({ ...p, [field]: msg }));
    clearTimeout(timers.current[field]);
    timers.current[field] = window.setTimeout(() => {
      remove(field);
    }, delay);
  };

  const remove = (field: string) =>
    setToasts((p) => {
      const copy = { ...p };
      delete copy[field];
      return copy;
    });

  return { toasts, push, remove };
};
