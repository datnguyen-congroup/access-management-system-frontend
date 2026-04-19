import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

export const ErrorLayout: React.FC = () => {
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
