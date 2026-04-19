/* eslint-disable react-refresh/only-export-components */
import React, { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const Dashboard = lazy(() => import('./pages/Dashboard'));

export const routes: RouteObject[] = [
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
];
