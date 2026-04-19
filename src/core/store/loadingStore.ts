import { create } from 'zustand';

interface LoadingState {
  globalLoading: boolean;
  setGlobalLoading: (isLoading: boolean) => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  globalLoading: false,
  setGlobalLoading: (isLoading) => set({ globalLoading: isLoading }),
}));
