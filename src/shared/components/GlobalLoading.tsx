import { Spin } from 'antd';

export const GlobalLoading = () => (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(255, 255, 255, 0.7)',
      zIndex: 9999,
    }}
  >
    <Spin size="large" tip="Loading..." />
  </div>
);
