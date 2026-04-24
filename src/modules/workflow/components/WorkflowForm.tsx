import { Button, Card, Form, FormInstance, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { DynamicForm, DynamicFormProps } from '@/shared/ui/form/DynamicForm';
import { useMemo } from 'react';
import { FormInputEnum, FormInputValue } from '@/shared/ui/form/types';

export type WorkflowStep = {
  name: FormInputValue<FormInputEnum.input>;
  order?: FormInputValue<FormInputEnum.number>;
  description?: FormInputValue<FormInputEnum.textarea>;
  steps2?: {
    description?: FormInputValue<FormInputEnum.textarea>;
    items?: {
      description?: FormInputValue<FormInputEnum.textarea>;
    }[];
  }[];
};

export type WorkflowValues = {
  name: FormInputValue<FormInputEnum.input>;
  version?: FormInputValue<FormInputEnum.number>;
  steps: WorkflowStep[];
};

export const WorkflowForm = ({
  form,
  onFinish,
}: {
  form: FormInstance<WorkflowValues>;
  onFinish: (values: WorkflowValues) => void;
}) => {
  const { t } = useTranslation();

  const schema: DynamicFormProps<WorkflowValues>['schema'] = useMemo(
    () => [
      [
        {
          name: 'name',
          label: t('common.form.title.name'),
          inputType: FormInputEnum.input,
          rules: [{ required: true }],
        },
        {
          name: 'version',
          label: t('common.form.title.version'),
          inputType: FormInputEnum.number,
        },
      ],
      [
        {
          name: 'steps',
          label: t('common.form.title.steps'),
          inputType: FormInputEnum.array,
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
                inputType: FormInputEnum.input,
                rules: [
                  {
                    required: true,
                  },
                ],
              },
              {
                name: 'order',
                label: t('common.form.title.order'),
                inputType: FormInputEnum.number,
              },
            ],
            [
              {
                name: 'description',
                label: t('common.form.title.description'),
                inputType: FormInputEnum.textarea,
              },
            ],
            [
              {
                name: 'steps2',
                label: 'level 2',
                inputType: FormInputEnum.array,
                fields: [
                  [
                    {
                      name: 'description',
                      label: 'item level 2',
                      inputType: FormInputEnum.textarea,
                    },
                  ],
                  [
                    {
                      name: 'items',
                      label: 'level 3',
                      inputType: FormInputEnum.array,
                      fields: [
                        [
                          {
                            name: 'description',
                            label: 'item level 3',
                            inputType: FormInputEnum.textarea,
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
    [t],
  );

  return (
    <Card>
      <DynamicForm<WorkflowValues>
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
