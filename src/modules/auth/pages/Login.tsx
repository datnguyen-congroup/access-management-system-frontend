import { Form, Input, Button, Card, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';

import { appSettings } from '@/app/settings';
import { useAuthStore } from '@/core/store/authStore';
import { message } from '@/core/utils/antd';

import { useLogin } from '../hooks';
import { LoginRequest } from '../types';

const { Title } = Typography;

export const Login: React.FC = () => {
  const { t } = useTranslation();
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const loginMutation = useLogin();

  // const {
  //   data: userProfile,
  //   isSuccess: isProfileSuccess,
  //   refetch: refetchProfile
  // } = useProfile();

  const onFinish = (values: LoginRequest) => {
    // loginMutation.mutate(values, {
    //   onSuccess: (data) => {
    //     storage.setToken(data.accessToken);
    //     storage.setRefreshToken(data.refreshToken);
    //     refetchProfile();
    //   },
    //   // onError: (error) => {
    //   //   message.error(error.message || t('auth.loginError'));
    //   // },
    // });

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
    <Card style={{ maxWidth: 400, width: '100%', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <Title level={3}>{t('auth.login')}</Title>
      </div>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label={t('auth.email')}
          name="email"
          rules={[
            { required: true, message: t('auth.validation.emailRequired') },
            { type: 'email', message: t('auth.validation.emailInvalid') },
          ]}
        >
          <Input placeholder="admin@example.com" size="large" />
        </Form.Item>
        <Form.Item
          label={t('auth.password')}
          name="password"
          rules={[{ required: true, message: t('auth.validation.passwordRequired') }]}
        >
          <Input.Password placeholder="123456" size="large" />
        </Form.Item>
        <Form.Item>
          <Link to="/forgot-password" style={{ float: 'right', marginBottom: 10 }}>
            {t('auth.forgotPassword')}
          </Link>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            block
            loading={loginMutation.isPending}
          >
            {t('auth.login')}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Login;
