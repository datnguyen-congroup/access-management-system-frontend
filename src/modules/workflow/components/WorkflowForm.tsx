import { Button, Card, Form, FormInstance, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { DynamicForm, DynamicFormProps } from '@/shared/ui/form/DynamicForm';
import { useMemo } from 'react';

export const WorkflowForm = ({
  form,
  onFinish,
}: {
  form: FormInstance;
  onFinish: (values: Record<string, unknown>) => void;
}) => {
  const { t } = useTranslation();

  const schema: DynamicFormProps['schema'] = useMemo(
    () => [
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
            [
              {
                name: 'steps2',
                label: 'level 2',
                inputType: 'array',
                fields: [
                  [
                    {
                      name: 'description',
                      label: 'item level 2',
                      inputType: 'textarea',
                    },
                  ],
                  [
                    {
                      name: 'items',
                      label: 'level 3',
                      inputType: 'array',
                      fields: [
                        [
                          {
                            name: 'description',
                            label: 'item level 3',
                            inputType: 'textarea',
                          },
                        ],
                      ],
                    },
                  ],
                ],
              },
            ],
          ],
        },
      ],
    ],
    [],
  );

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
