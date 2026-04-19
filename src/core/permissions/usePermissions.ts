import { useAuthStore } from '../store/authStore';
import { appSettings } from '@/app/settings';

export const usePermissions = () => {
  const user = useAuthStore((state) => state.user);

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;

    // Super admin role automatically grants all permissions
    if (user.roles.includes(appSettings.superAdminRole)) return true;

    return user.permissions.includes(permission);
  };

  const hasAnyPermission = (permissions: string[]): boolean => {
    return permissions.some(hasPermission);
  };

  const hasAllPermissions = (permissions: string[]): boolean => {
    return permissions.every(hasPermission);
  };

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
  };
};
