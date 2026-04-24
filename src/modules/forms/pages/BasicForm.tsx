import { Card, Form, Button, Space, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { message } from '@/core/utils/antd';
import { DynamicForm, DynamicFormProps } from '@/shared/ui/form/DynamicForm';
import { FormInputEnum, FormInputValue } from '@/shared/ui/form/types';

const { Title, Text } = Typography;

interface BasicFormValues {
  name: FormInputValue<FormInputEnum.input>;
  age?: FormInputValue<FormInputEnum.number>;
  users?: {
    name: FormInputValue<FormInputEnum.input>;
    age?: FormInputValue<FormInputEnum.number>;
    child?: {
      value: FormInputValue<FormInputEnum.select>;
    }[];
  }[];
  role?: FormInputValue<FormInputEnum.select>;
}

export const BasicForm: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm<BasicFormValues>();

  const onFinish = (values: BasicFormValues) => {
    console.log('Form values:', values);
    message.success('Successfully submitted form!');
    form.resetFields();
  };

  const schema: DynamicFormProps<BasicFormValues>['schema'] = [
    [
      {
        name: 'name',
        label: 'Name',
        inputType: FormInputEnum.input,
        rules: [{ required: true, message: 'Required' }],
        inputProps: {},
      },
      {
        name: 'age',
        label: 'Age',
        inputType: FormInputEnum.number,
      },
    ],
    [
      {
        name: 'users',
        label: 'Users',
        inputType: FormInputEnum.array,
        fields: [
          [
            { name: 'name', label: 'Name', inputType: FormInputEnum.input },
            { name: 'age', label: 'Age', inputType: FormInputEnum.number },
          ],
          [
            {
              name: 'child',
              label: 'Child',
              inputType: FormInputEnum.array,
              fields: [
                [
                  {
                    name: 'value',
                    inputType: FormInputEnum.select,
                    inputProps: {
                      options: [
                        { label: 'Type 1', value: '1' },
                        { label: 'Type 2', value: '2' },
                      ],
                    },
                  },
                ],
              ],
            },
          ],
        ],
      },
    ],
    [
      {
        name: 'role',
        label: 'Role',
        inputType: FormInputEnum.select,
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
        inputType: FormInputEnum.custom,
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
        <DynamicForm<BasicFormValues>
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
