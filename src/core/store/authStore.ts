import { create } from 'zustand';
import { storage } from '../utils/storage';

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

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: !!storage.getToken(),
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
}));
