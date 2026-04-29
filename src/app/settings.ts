export const appSettings = {
  // Pull from environment variables for easy white-labeling/reuse, fallback to default
  appName: import.meta.env.VITE_APP_NAME || 'Admin Base System',
  version: '1.0.0',

  // Role-Based Access Control (RBAC) Configurations
  // The role that bypasses all permission checks (can be used by master administrators)
  superAdminRole: 'super_admin',

  // Feature flags to quickly toggle UI elements globally
  features: {
    enableNotifications: true,
    enableThemeToggle: true,
    enableMultiLanguage: true,
  },
};

export const APP_ROUTES = {
  dashboard: '/dashboard',
  forms: {
    index: '/forms',
    basic: '/forms/basic',
  },
  list: {
    index: '/list',
    standard: '/list/standard',
  },
  users: '/users',
  workflow: {
    index: '/workflow',
    list: '/workflow/list',
    detail: '/workflow/:id',
    create: '/workflow/create',
  },
  company: '/company',
} as const;
