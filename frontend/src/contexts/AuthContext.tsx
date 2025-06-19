'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
  getMe,
} from '@/services/authService';

// FIXME: какой-то странный контекст на все, наверное декомпозировать

type Role = 'student' | 'moderator' | 'admin' | null;
interface AuthCtx {
  role: Role;
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
  const [role, setRole] = useState<Role>(null);

  /* 1. при монтировании пытаемся получить роль */
  useEffect(() => {
    (async () => {
      const me = await getMe();
      setRole(me?.role ?? null);
    })();
  }, []);

  /* 2. login: отправляем форму, куки ставятся сервером,
        затем ещё раз запрашиваем /me */
  const login = async (email: string, password: string) => {
    try {
      const me = await apiLogin(email, password);
      setRole(me?.role ?? null);
    } catch {
      throw new Error('Неверные данные');
    }
  };

  const register = async (
    fullName: string,
    phone: string,
    email: string,
    password: string
  ) => {
    try {
      const me = await apiRegister(fullName, phone, email, password);
      setRole(me?.role ?? null);
    } catch (err: any) {
      throw new Error(err?.response?.data?.message ?? 'REGISTER_FAILED');
    }
  };

  /* 3. logout: бек удаляет куки, затем сбрасываем роль */
  const logout = async () => {
    await apiLogout();
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ role, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
