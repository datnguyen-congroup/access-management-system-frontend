/* eslint-disable react-refresh/only-export-components */
import React, { lazy } from 'react';
import { RouteObject } from 'react-router';

const BasicForm = lazy(() => import('./pages/BasicForm'));

export const routes: RouteObject[] = [
  {
    path: '/forms/basic',
    element: <BasicForm />,
  },
];
