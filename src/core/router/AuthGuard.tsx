import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuthStore } from '../store/authStore';
import { usePermissions } from '../permissions/usePermissions';

interface AuthGuardProps {
  children: React.ReactElement;
  requiredPermissions?: string[];
  requireAllPermissions?: boolean;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  requiredPermissions,
  requireAllPermissions = false,
}) => {
  const { isAuthenticated } = useAuthStore();
  const { hasAllPermissions, hasAnyPermission } = usePermissions();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredPermissions && requiredPermissions.length > 0) {
    const hasAccess = requireAllPermissions
      ? hasAllPermissions(requiredPermissions)
      : hasAnyPermission(requiredPermissions);

    if (!hasAccess) {
      return <Navigate to="/403" replace />;
    }
  }

  return children;
};
