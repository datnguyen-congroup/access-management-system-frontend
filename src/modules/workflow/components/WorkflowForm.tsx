import { Button, Card, Form, FormInstance, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { DynamicForm, DynamicFormProps } from '@/shared/ui/form/DynamicForm';

export const WorkflowForm = ({
  form,
  onFinish,
}: {
  form: FormInstance;
  onFinish: (values: Record<string, unknown>) => void;
}) => {
  const { t } = useTranslation();

  const schema: DynamicFormProps['schema'] = [
    [
      {
        name: 'name',
        label: t('common.form.title.name'),
        inputType: 'input',
        rules: [{ required: true }],
      },
      {
        name: 'version',
        label: t('common.form.title.version'),
        inputType: 'number',
      },
    ],
    [
      {
        name: 'steps',
        label: t('common.form.title.steps'),
        inputType: 'array',
        rules: [
          {
            required: true,
          },
        ],
        fields: [
          [
            {
              name: 'name',
              label: t('common.form.title.name'),
              inputType: 'input',
              rules: [
                {
                  required: true,
                },
              ],
            },
            { name: 'order', label: t('common.form.title.order'), inputType: 'number' },
          ],
          [
            {
              name: 'description',
              label: t('common.form.title.description'),
              inputType: 'textarea',
            },
          ],
        ],
      },
    ],
  ];

  return (
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
  );
};
