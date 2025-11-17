"use client";

import { create } from 'zustand';
import { authApi } from '../api';
import type { User, LoginCredentials, RegisterData } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
  updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  login: async (credentials: LoginCredentials) => {
    const response = await authApi.login(credentials);
    if (response.success && response.data) {
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    }
  },

  register: async (data: RegisterData) => {
    const response = await authApi.register(data);
    if (response.success && response.data) {
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    }
  },

  logout: () => {
    authApi.logout();
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  checkAuth: () => {
    const user = authApi.getCurrentUser();
    const isAuthenticated = authApi.isAuthenticated();
    set({
      user,
      isAuthenticated,
      isLoading: false,
    });
  },

  updateUser: (user: User) => {
    set({ user });
  },
}));

// Provider component for initializing auth state
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  // Check auth on mount
  React.useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return <>{children}</>;
}

// Export for backwards compatibility
import React from 'react';
