import { lazy } from 'react';
import { RouteObject } from 'react-router';

import { APP_PERMISSIONS } from '../../app/permissions';
import { AuthGuard } from '../../core/router/AuthGuard';
const WorkflowList = lazy(() => import('./pages/WorkflowList'));

export const routes: RouteObject[] = [
  {
    path: '/workflow',
    element: (
      <AuthGuard requiredPermissions={[APP_PERMISSIONS.USERS_VIEW]}>
        <WorkflowList />
      </AuthGuard>
    ),
  },
];
