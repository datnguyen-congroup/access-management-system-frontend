import { create } from 'zustand';

interface SettingsState {
  sidebarCollapsed: boolean;
  mobileMenuOpen: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  sidebarCollapsed: false,
  mobileMenuOpen: false,
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
}));
