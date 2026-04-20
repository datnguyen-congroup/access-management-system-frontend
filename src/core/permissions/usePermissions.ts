import { appSettings } from '@/app/settings';

import { useAuthStore } from '../store/authStore';

export const usePermissions = () => {
  const user = useAuthStore((state) => state.user);

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;

    // Super admin role automatically grants all permissions
    if (user.roles.includes(appSettings.superAdminRole)) return true;

    return user.permissions.includes(permission);
  };

  const hasAnyPermission = (permissions: string[]): boolean => permissions.some(hasPermission);

  const hasAllPermissions = (permissions: string[]): boolean => permissions.every(hasPermission);

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
  };
};
