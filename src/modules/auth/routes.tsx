/* eslint-disable react-refresh/only-export-components */
import React, { lazy } from 'react';
import { RouteObject } from 'react-router';

const Login = lazy(() => import('./pages/Login'));

export const routes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
];
