import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';

import { router } from './app/routes';
import { appSettings } from './app/settings';
import { AppProviders } from './core/providers/AppProviders';
import './core/i18n'; // Initialize i18n
import 'antd/dist/reset.css';

// Dynamically set the document title from centralized settings
document.title = appSettings.appName;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </React.StrictMode>,
);
