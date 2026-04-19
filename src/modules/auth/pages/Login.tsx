import React from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { useAuthStore } from '@/core/store/authStore';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLogin } from '../hooks';
import { appSettings } from '@/app/settings';

const { Title } = Typography;

export const Login: React.FC = () => {
  const { t } = useTranslation();
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const onFinish = (values: Record<string, string>) => {
    // Mock API call using the mutation's pending state manually or just setTimeout
    setTimeout(() => {
      login(
        {
          id: '1',
          email: values.email,
          fullName: 'Master Administrator',
          roles: [appSettings.superAdminRole], // Assign super admin role for testing
          permissions: [],
        },
        'fake-jwt-access-token',
        'fake-jwt-refresh-token',
      );
      message.success(t('auth.loginSuccess'));
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <Card style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <Title level={3}>{t('auth.login')}</Title>
      </div>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label={t('auth.email')} name="email" rules={[{ required: true, type: 'email' }]}>
          <Input placeholder="admin@example.com" />
        </Form.Item>
        <Form.Item label={t('auth.password')} name="password" rules={[{ required: true }]}>
          <Input.Password placeholder="123456" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loginMutation.isPending}>
            {t('auth.login')}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Login;
