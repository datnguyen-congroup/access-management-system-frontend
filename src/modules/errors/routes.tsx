/* eslint-disable react-refresh/only-export-components */
import React, { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const Forbidden = lazy(() => import('./pages/Forbidden'));
const NotFound = lazy(() => import('./pages/NotFound'));

export const routes: RouteObject[] = [
  {
    path: '403',
    element: <Forbidden />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
