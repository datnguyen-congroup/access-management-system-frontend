/* eslint-disable react-refresh/only-export-components */
import React, { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const StandardList = lazy(() => import('./pages/StandardList'));

export const routes: RouteObject[] = [
  {
    path: '/list/standard',
    element: <StandardList />,
  },
];
