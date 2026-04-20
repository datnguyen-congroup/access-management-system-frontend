import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import { Layout } from 'antd';
import { useAuthStore } from '@/core/store/authStore';

export const AuthLayout: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  // Redirect authenticated users away from the auth screens (e.g., login)
  if (isAuthenticated) {
    const from = location.state?.from?.pathname || '/dashboard';
    return <Navigate to={from} replace />;
  }

  return (
    <Layout
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Outlet />
    </Layout>
  );
};
