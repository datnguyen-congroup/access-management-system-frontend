import { Button, Card, Form, Input, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { message } from '@/core/utils/antd';
import { useForgotPassword } from '../hooks';
import { ForgotPasswordRequest } from '../types';

const { Title } = Typography;

const ForgotPassword = () => {
  const { t } = useTranslation();
  const forgotPasswordMutation = useForgotPassword();

  const onFinish = (values: ForgotPasswordRequest) => {
    forgotPasswordMutation.mutate(values, {
      onSuccess: () => {
        message.success(t('auth.forgotPasswordSuccess', { email: values.email }));
      },
      onError: (error: any) => {
        message.error(error.message || t('auth.forgotPasswordError'));
      },
    });
  };

  return (
    <Card style={{ maxWidth: 400, width: '100%' }}>
      <Title level={3} style={{ textAlign: 'center' }}>
        {t('auth.forgotPassword')}
      </Title>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          label={t('auth.email')}
          name="email"
          rules={[
            { required: true, message: t('auth.validation.emailRequired') },
            { type: 'email', message: t('auth.validation.emailInvalid') },
          ]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            block
            loading={forgotPasswordMutation.isPending}
          >
            {t('auth.sendResetLink')}
          </Button>
        </Form.Item>
        <Form.Item style={{ textAlign: 'center' }}>
          <Link to="/login">{t('auth.backToLogin')}</Link>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ForgotPassword;
