'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Role = 'student' | 'moderator' | 'admin' | null;
interface AuthCtx {
  role: Role;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthCtx | null>(null);
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx)
    throw new Error('useAuth должен использоваться внутри <AuthProvider>');
  return ctx;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<Role>(null);

  /* 1. при монтировании пытаемся получить роль */
  useEffect(() => {
    (async () => {
      const res = await fetch('/api/users/me', {
        credentials: 'include', // важно, чтобы сервер мог прочитать куки
      });
      const { role } = await res.json();
      setRole(role);
    })();
  }, []);

  /* 2. login: отправляем форму, куки ставятся сервером,
        затем ещё раз запрашиваем /me */
  const login = async (email: string, password: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      credentials: 'include', // важно, чтобы Set-Cookie сработал
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error('Неверные данные');

    // куки уже в браузере, просто узнаём роль
    const me = await fetch('/api/users/me', { credentials: 'include' });
    if (me.ok) {
      const { role } = await me.json();
      setRole(role);
    }
  };

  const register = async (email: string, password: string) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error('Неверные данные');

    const me = await fetch('/api/users/me', { credentials: 'include' });
    if (me.ok) {
      const { role } = await me.json();
      setRole(role);
    }
  };

  /* 3. logout: бек удаляет куки, затем сбрасываем роль */
  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ role, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
