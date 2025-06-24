'use client';
import { useEffect } from 'react';

export default function PwaRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => console.log('✅ Registered', reg))
        .catch((err) => console.error('❌ Failed to register', err));
    }
  }, []);

  return null;
}
