import React, { ReactNode } from 'react';
import { usePermissions } from './usePermissions';

interface PermissionGuardProps {
  permissions?: string | string[];
  requireAll?: boolean;
  children: ReactNode;
  fallback?: ReactNode;
}

export const PermissionGuard: React.FC<PermissionGuardProps> = ({
  permissions,
  requireAll = false,
  children,
  fallback = null,
}) => {
  const { hasAnyPermission, hasAllPermissions } = usePermissions();

  if (!permissions || permissions.length === 0) {
    return <>{children}</>;
  }

  const permsArray = Array.isArray(permissions) ? permissions : [permissions];

  const hasAccess = requireAll ? hasAllPermissions(permsArray) : hasAnyPermission(permsArray);

  return hasAccess ? <>{children}</> : <>{fallback}</>;
};
