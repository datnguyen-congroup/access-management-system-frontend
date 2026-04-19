/* eslint-disable react-refresh/only-export-components */
import React, { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { AuthGuard } from '../../core/router/AuthGuard';
import { APP_PERMISSIONS } from '../../app/permissions';

const UserList = lazy(() => import('./pages/UserList'));

export const routes: RouteObject[] = [
  {
    path: '/users',
    element: (
      <AuthGuard requiredPermissions={[APP_PERMISSIONS.USERS_VIEW]}>
        <UserList />
      </AuthGuard>
    ),
  },
];
