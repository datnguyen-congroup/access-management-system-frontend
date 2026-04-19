export const storage = {
  getToken: (): string | null => localStorage.getItem('access_token'),
  setToken: (token: string): void => localStorage.setItem('access_token', token),
  clearToken: (): void => localStorage.removeItem('access_token'),

  getRefreshToken: (): string | null => localStorage.getItem('refresh_token'),
  setRefreshToken: (token: string): void => localStorage.setItem('refresh_token', token),
  clearRefreshToken: (): void => localStorage.removeItem('refresh_token'),

  getItem: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  setItem: <T>(key: string, value: T): void => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: (key: string): void => {
    localStorage.removeItem(key);
  },
  clearAll: (): void => localStorage.clear(),
};
