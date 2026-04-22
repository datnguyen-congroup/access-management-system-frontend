import { Card, Form, Input, DatePicker, Button, Space, Typography, message } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { DynamicForm, DynamicFormProps } from '@/shared/ui/form/DynamicForm';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

export const BasicForm: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const onFinish = (values: Record<string, unknown>) => {
    console.log('Form values:', values);
    message.success('Successfully submitted form!');
    form.resetFields();
  };

  const schema: DynamicFormProps['schema'] = [
    [
      {
        name: 'name',
        label: 'Name',
        inputType: 'input',
        rules: [{ required: true, message: 'Required' }],
        inputProps: {},
      },
      {
        name: 'age',
        label: 'Age',
        inputType: 'number',
      },
    ],
    [
      {
        name: 'role',
        label: 'Role',
        inputType: 'select',
        inputProps: {
          options: [
            { label: 'Admin', value: 'admin' },
            { label: 'User', value: 'user' },
          ],
        },
      },
    ],
    [
      {
        name: 'custom',
        label: 'Custom UI',
        inputType: 'custom',
        render: () => <div>Anything here</div>,
      },
    ],
  ];

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <div style={{ marginBottom: 24, textAlign: 'center' }}>
        <Title level={3}>Basic Form</Title>
        <Text type="secondary">
          Form pages are used to collect or verify information to users, and basic forms are common
          in scenarios where there are fewer data items.
        </Text>
      </div>
      <Card>
        <DynamicForm
          schema={schema}
          form={form}
          onFinish={onFinish}
          buttons={
            <Form.Item style={{ marginTop: 32 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  {t('common.actions.submit')}
                </Button>
                <Button onClick={() => form.resetFields()}>{t('common.actions.cancel')}</Button>
              </Space>
            </Form.Item>
          }
        />
      </Card>
    </div>
  );
};

export default BasicForm;
