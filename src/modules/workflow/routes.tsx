import { lazy } from 'react';
import { RouteObject } from 'react-router';

import { APP_PERMISSIONS } from '../../app/permissions';
import { AuthGuard } from '../../core/router/AuthGuard';
import { APP_ROUTES } from '@/app/settings';
import CreateWorkflow from './pages/CreateWorkflow';
const WorkflowList = lazy(() => import('./pages/WorkflowList'));

export const routes: RouteObject[] = [
  {
    path: APP_ROUTES.workflow.list,
    element: (
      <AuthGuard requiredPermissions={[APP_PERMISSIONS.WORKFLOW_VIEW]}>
        <WorkflowList />
      </AuthGuard>
    ),
  },
  {
    path: APP_ROUTES.workflow.create,
    element: (
      <AuthGuard requiredPermissions={[APP_PERMISSIONS.WORKFLOW_CREATE]}>
        <CreateWorkflow />
      </AuthGuard>
    ),
  },
];
