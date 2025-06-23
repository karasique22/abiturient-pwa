'use client';

import React, { createContext, useContext } from 'react';
import { AxiosError } from 'axios';
import api from '@/lib/api';
import { useCurrentUser } from '@/hooks/useCurrentUser';

type Role = 'student' | 'moderator' | 'admin' | null;
interface AuthCtx {
  role: Role | undefined;
  login: (email: string, password: string) => Promise<void>;
  register: (
    fullName: string,
    phone: string,
    email: string,
    password: string
  ) => Promise<void>;
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
  const { role, mutate } = useCurrentUser();

  /* 2. login: отправляем форму, куки ставятся сервером,
        затем ещё раз запрашиваем /me */
  const login = async (email: string, password: string) => {
    const res = await api.post('/auth/login', { email, password });
    if (res.status !== 201 && res.status !== 200) {
      throw new Error('Неверные данные');
    }

    await mutate();
  };

  const register = async (
    fullName: string,
    phone: string,
    email: string,
    password: string
  ) => {
    try {
      await api.post('/auth/register', {
        fullName,
        phone,
        email,
        password,
      });
    } catch (err) {
      const errorResponse = (err as AxiosError<{ message?: string }>).response;
      const message = errorResponse?.data?.message;
      throw new Error(message ?? 'REGISTER_FAILED');
    }

    await login(email, password);
  };

  /* 3. logout: бек удаляет куки, затем сбрасываем роль */
  const logout = async () => {
    await api.post('/auth/logout');
    await mutate(null, { revalidate: false });
  };

  return (
    <AuthContext.Provider value={{ role, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
