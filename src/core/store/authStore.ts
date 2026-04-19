import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { storage } from '../utils/storage';
import { appSettings } from '@/app/settings';

export interface User {
  id: string;
  email: string;
  fullName: string;
  roles: string[];
  permissions: string[];
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User, token: string, refreshToken?: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user, token, refreshToken) => {
        storage.setToken(token);
        if (refreshToken) {
          storage.setRefreshToken(refreshToken);
        }
        set({ user, isAuthenticated: true });
      },
      logout: () => {
        storage.clearToken();
        storage.clearRefreshToken();
        set({ user: null, isAuthenticated: false });
      },
      setUser: (user) => set({ user }),
    }),
    {
      name: appSettings.appName.replaceAll(' ', '-') + '-auth-storage',
      // Only persist user and isAuthenticated. Tokens are handled by storage utility.
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
