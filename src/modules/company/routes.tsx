/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import { RouteObject } from 'react-router';

const CompanyList = lazy(() => import('./pages/CompanyList'));
const CompanyFormPage = lazy(() => import('./pages/CompanyFormPage'));

export const routes: RouteObject[] = [
  {
    path: '/company',
    element: <CompanyList />,
  },
  {
    path: '/company/create',
    element: <CompanyFormPage />,
  },
  {
    path: '/company/:id/edit',
    element: <CompanyFormPage />,
  },
];
