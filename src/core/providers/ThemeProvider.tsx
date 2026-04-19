import React, { ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import { useThemeStore } from '../store/themeStore';
import { lightTheme, darkTheme } from '@/app/theme';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const mode = useThemeStore((state) => state.mode);

  return (
    <ConfigProvider theme={mode === 'dark' ? darkTheme : lightTheme}>{children}</ConfigProvider>
  );
};
