import { ThemeConfig, theme } from 'antd';

export const lightTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: '#1677ff',
    borderRadius: 6,
  },
  components: {
    Layout: {
      headerBg: '#ffffff',
      siderBg: '#ffffff',
    },
  },
};

export const darkTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#1677ff',
    borderRadius: 6,
  },
  components: {
    Layout: {
      headerBg: '#141414',
      siderBg: '#141414',
    },
  },
};
