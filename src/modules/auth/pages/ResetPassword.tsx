import { Button, Card, Form, Input, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router';

import { message } from '@/core/utils/antd';
import { useResetPassword } from '../hooks';
import { ResetPasswordRequest } from '../types';

const { Title } = Typography;

const ResetPassword = () => {
  const { t } = useTranslation();
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const resetPasswordMutation = useResetPassword();

  const onFinish = (values: ResetPasswordRequest) => {
    if (token) {
      resetPasswordMutation.mutate(
        { ...values, token },
        {
          onSuccess: () => {
            message.success(t('auth.resetPasswordSuccess'));
            navigate('/login');
          },
          onError: (error: any) => {
            message.error(error.message || t('auth.resetPasswordError'));
          },
        },
      );
    }
  };

  if (!token) {
    navigate('/login');
    return null;
  }

  return (
    <Card style={{ maxWidth: 400, width: '100%' }}>
      <Title level={3} style={{ textAlign: 'center' }}>
        {t('auth.resetPassword')}
      </Title>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          label={t('auth.newPassword')}
          name="password"
          rules={[{ required: true, message: t('auth.validation.passwordRequired') }]}
        >
          <Input.Password size="large" />
        </Form.Item>
        <Form.Item
          label={t('auth.confirmPassword')}
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: t('auth.validation.confirmPasswordRequired') },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(t('auth.validation.passwordMismatch')));
              },
            }),
          ]}
        >
          <Input.Password size="large" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            block
            loading={resetPasswordMutation.isPending}
          >
            {t('auth.resetPassword')}
          </Button>
        </Form.Item>
        <Form.Item style={{ textAlign: 'center' }}>
          <Link to="/login">{t('auth.backToLogin')}</Link>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ResetPassword;
