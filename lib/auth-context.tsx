'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from './types';
import { auth, users } from './api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { firstName: string; lastName: string; email: string; password: string; phone?: string; address?: string }) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await users.getCurrentUser();
        if (response.data) {
          setUser(response.data);
        }
      }
    } catch (err) {
      console.error('Auth check failed:', err);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      const response = await auth.login({ email, password });
      if (response.data) {
        localStorage.setItem('token', response.data.token ?? '');
        setUser(response.data);
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
      throw err;
    }
  };

  const register = async (data: { firstName: string; lastName: string; email: string; password: string; phone?: string; address?: string }) => {
    try {
      setError(null);
      const response = await auth.register(data);
      if (response.data) {
        localStorage.setItem('token', response.data.token ?? '');
        setUser(response.data);
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed');
      throw err;
    }
  };

  const logout = async () => {
    try {
      await auth.logout();
      localStorage.removeItem('token');
      setUser(null);
      router.push('/login');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Logout failed');
      throw err;
    }
  };

  const updateUser = async (data: Partial<User>) => {
    try {
      setError(null);
      const response = await users.updateCurrentUser(data);
      if (response.data) {
        setUser(response.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Update failed');
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 