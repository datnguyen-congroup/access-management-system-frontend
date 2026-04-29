import { Card, Form, Button, Space, Typography, Row, Col } from 'antd';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { message } from '@/core/utils/antd';
import { DynamicForm, DynamicFormProps } from '@/shared/ui/form/DynamicForm';
import { FormInputEnum, FormInputValue } from '@/shared/ui/form/types';

import { useCreateCompany, useUpdateCompany, useCompany } from '../hooks';

const { Title } = Typography;

interface CompanyFormValues {
  name: FormInputValue<FormInputEnum.input>;
  domain: FormInputValue<FormInputEnum.input>;
  taxID: FormInputValue<FormInputEnum.input>;
  contract_address: FormInputValue<FormInputEnum.input>;
  physical_address: FormInputValue<FormInputEnum.input>;
  link_map_address: FormInputValue<FormInputEnum.input>;
  hotline: FormInputValue<FormInputEnum.select, true>;
  enabled: FormInputValue<FormInputEnum.switch>;
}

export const CompanyFormPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;

  const [form] = Form.useForm<CompanyFormValues>();

  const { data: initialData, isLoading: isLoadingCompany } = useCompany(id || '');
  const createMutation = useCreateCompany();
  const updateMutation = useUpdateCompany(id || '');

  useEffect(() => {
    if (isEditMode && initialData) {
      form.setFieldsValue({
        name: initialData.name,
        domain: initialData.domain,
        taxID: initialData.taxID,
        contract_address: initialData.contract_address,
        physical_address: initialData.physical_address,
        link_map_address: initialData.link_map_address,
        hotline: initialData.hotline,
        enabled: initialData.enabled,
      });
    } else if (!isEditMode) {
      form.setFieldValue('enabled', false);
    }
  }, [isEditMode, initialData, form]);

  const onFinish = (values: CompanyFormValues) => {
    const payload = {
      ...values,
      hotline: Array.isArray(values.hotline) ? values.hotline.map(String) : [],
    };

    if (isEditMode) {
      updateMutation.mutate(payload, {
        onSuccess: () => {
          message.success(t('company.messages.updateSuccess'));
          navigate('/company');
        },
      });
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          message.success(t('company.messages.createSuccess'));
          navigate('/company');
        },
      });
    }
  };

  const schema: DynamicFormProps<CompanyFormValues>['schema'] = [
    [
      {
        name: 'name',
        label: t('company.fields.name'),
        inputType: FormInputEnum.input,
        rules: [{ required: true, message: t('common.validation.required') }],
        colSpan: 24,
      },
    ],
    [
      {
        name: 'domain',
        label: t('company.fields.domain'),
        inputType: FormInputEnum.input,
        rules: [
          { required: true, message: t('common.validation.required') },
          {
            pattern: /^([a-z0-9_]+\.)+[a-z0-9_]+$/,
            message: t('company.validation.domain'),
          },
        ],
        colSpan: 12,
      },
      {
        name: 'taxID',
        label: t('company.fields.taxID', 'Mã số thuế'),
        inputType: FormInputEnum.input,
        inputProps: {
          maxLength: 14,
          onKeyPress: (e: any) => {
            if (!/[0-9-]/.test(e.key)) {
              e.preventDefault();
            }
          },
          onPaste: (e: any) => {
            const pasteData = e.clipboardData.getData('text');
            if (/[^0-9-]/.test(pasteData)) {
              e.preventDefault();
            }
          },
        },
        rules: [
          { required: true, message: t('common.validation.required') },
          { min: 10, message: t('company.validation.taxIDMin') },
        ],
        colSpan: 12,
      },
    ],
    [
      {
        name: 'hotline',
        label: t('company.fields.hotline'),
        inputType: FormInputEnum.select,
        inputProps: {
          mode: 'tags',
          placeholder: t('company.placeholder.hotline'),
        },
        rules: [{ required: true, message: t('common.validation.required') }],
        colSpan: 12,
      },
      {
        name: 'enabled',
        label: t('company.fields.enabled'),
        inputType: FormInputEnum.switch,
        colSpan: 12,
      },
    ],
    [
      {
        name: 'contract_address',
        label: t('company.fields.contract_address'),
        inputType: FormInputEnum.input,
        rules: [{ required: true, message: t('common.validation.required') }],
        colSpan: 24,
      },
    ],
    [
      {
        name: 'physical_address',
        label: t('company.fields.physical_address'),
        inputType: FormInputEnum.input,
        rules: [{ required: true, message: t('common.validation.required') }],
        colSpan: 24,
      },
    ],
    [
      {
        name: 'link_map_address',
        label: t('company.fields.link_map_address'),
        inputType: FormInputEnum.input,
        rules: [
          { required: true, message: t('common.validation.required') },
          { type: 'url', message: t('company.validation.url') },
        ],
        colSpan: 24,
      },
    ],
  ];

  return (
    <Card bordered={false}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={4} style={{ margin: 0 }}>
            {isEditMode ? t('company.titleEdit') : t('company.titleCreate')}
          </Title>
        </Col>
      </Row>
      <DynamicForm<CompanyFormValues>
        schema={schema}
        form={form}
        onFinish={onFinish}
        buttons={
          <Form.Item style={{ marginTop: 24 }}>
            <Space>
              <Button
                type="primary"
                onClick={() => form.submit()}
                loading={createMutation.isPending || updateMutation.isPending}
              >
                {t('common.actions.save')}
              </Button>
              <Button onClick={() => navigate('/company')}>{t('common.actions.cancel')}</Button>
            </Space>
          </Form.Item>
        }
      />
    </Card>
  );
};

export default CompanyFormPage;
