import { ConfigProvider } from 'antd';
import React, { ReactNode } from 'react';

import { lightTheme, darkTheme } from '@/app/theme';

import { useThemeStore } from '../store/themeStore';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const mode = useThemeStore((state) => state.mode);

  return (
    <ConfigProvider theme={mode === 'dark' ? darkTheme : lightTheme}>{children}</ConfigProvider>
  );
};
