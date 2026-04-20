import { Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router';

export const ErrorLayout: React.FC = () => (
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
