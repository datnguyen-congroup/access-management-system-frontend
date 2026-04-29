/* eslint-disable react-refresh/only-export-components */
import { Result, Button } from 'antd';
import React, { Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';

import { AuthGuard } from '@/core/router/AuthGuard';
import { AuthLayout } from '@/layouts/AuthLayout/AuthLayout';
import { ErrorLayout } from '@/layouts/ErrorLayout/ErrorLayout';
import { MainLayout } from '@/layouts/MainLayout/MainLayout';
import { authModule } from '@/modules/auth';
import { companyModule } from '@/modules/company';
import { dashboardModule } from '@/modules/dashboard';
import { errorModule } from '@/modules/errors';
import { formsModule } from '@/modules/forms';
import { listModule } from '@/modules/list';
import { userModule } from '@/modules/user';
import { workflowModule } from '@/modules/workflow';

const Fallback = () => <div style={{ padding: 24, textAlign: 'center' }}>Loading...</div>;

// Component to handle unexpected routing errors (e.g. module loading failure)
const RouteErrorBoundary = () => (
  <div
    style={{
      display: 'flex',
      minHeight: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong while loading this page."
      extra={
        <Button type="primary" onClick={() => (window.location.href = '/')}>
          Back to Home
        </Button>
      }
    />
  </div>
);

const withSuspense = (element: React.ReactNode) => (
  <Suspense fallback={<Fallback />}>{element}</Suspense>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    element: <AuthLayout />,
    errorElement: <RouteErrorBoundary />,
    children: authModule.routes,
  },
  {
    element: (
      <AuthGuard>
        <MainLayout />
      </AuthGuard>
    ),
    errorElement: <RouteErrorBoundary />,
    children: [
      ...dashboardModule.routes,
      ...userModule.routes,
      ...formsModule.routes,
      ...listModule.routes,
      ...workflowModule.routes,
      ...companyModule.routes,
    ].map((route) => ({
      ...route,
      element: withSuspense(route.element),
    })),
  },
  {
    element: <ErrorLayout />,
    errorElement: <RouteErrorBoundary />,
    children: errorModule.routes,
  },
]);
