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
          message.success(t('company.messages.updateSuccess', 'Cập nhật công ty thành công'));
          navigate('/company');
        },
      });
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          message.success(t('company.messages.createSuccess', 'Thêm công ty thành công'));
          navigate('/company');
        },
      });
    }
  };

  const schema: DynamicFormProps<CompanyFormValues>['schema'] = [
    [
      {
        name: 'name',
        label: t('company.fields.name', 'Tên công ty'),
        inputType: FormInputEnum.input,
        rules: [
          { required: true, message: t('common.validation.required', 'Trường này là bắt buộc') },
        ],
        colSpan: 24,
      },
    ],
    [
      {
        name: 'domain',
        label: t('company.fields.domain', 'Domain'),
        inputType: FormInputEnum.input,
        rules: [
          { required: true, message: t('common.validation.required', 'Trường này là bắt buộc') },
          {
            pattern: /^([a-z0-9_]+\.)+[a-z0-9_]+$/,
            message: t(
              'company.validation.domain',
              'Phải có định dạng domain (VD: vn.condigital, com.apple)',
            ),
          },
        ],
        colSpan: 12,
      },
      {
        name: 'taxID',
        label: t('company.fields.taxID', 'Mã số thuế'),
        inputType: FormInputEnum.input,
        rules: [
          { required: true, message: t('common.validation.required', 'Trường này là bắt buộc') },
        ],
        colSpan: 12,
      },
    ],
    [
      {
        name: 'hotline',
        label: t('company.fields.hotline', 'Hotline'),
        inputType: FormInputEnum.select,
        inputProps: {
          mode: 'tags',
          placeholder: t('company.placeholder.hotline', 'Nhập số điện thoại và nhấn Enter'),
        },
        rules: [
          { required: true, message: t('common.validation.required', 'Trường này là bắt buộc') },
        ],
        colSpan: 12,
      },
      {
        name: 'enabled',
        label: t('company.fields.enabled', 'Kích hoạt'),
        inputType: FormInputEnum.switch,
        colSpan: 12,
      },
    ],
    [
      {
        name: 'contract_address',
        label: t('company.fields.contract_address', 'Địa chỉ ĐKKD'),
        inputType: FormInputEnum.input,
        rules: [
          { required: true, message: t('common.validation.required', 'Trường này là bắt buộc') },
        ],
        colSpan: 24,
      },
    ],
    [
      {
        name: 'physical_address',
        label: t('company.fields.physical_address', 'Địa chỉ thực'),
        inputType: FormInputEnum.input,
        rules: [
          { required: true, message: t('common.validation.required', 'Trường này là bắt buộc') },
        ],
        colSpan: 24,
      },
    ],
    [
      {
        name: 'link_map_address',
        label: t('company.fields.link_map_address', 'Link Google Map'),
        inputType: FormInputEnum.input,
        rules: [
          { required: true, message: t('common.validation.required', 'Trường này là bắt buộc') },
          { type: 'url', message: t('company.validation.url', 'Phải có định dạng URL') },
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
            {isEditMode
              ? t('company.title.edit', 'Cập nhật công ty')
              : t('company.title.create', 'Thêm mới công ty')}
          </Title>
        </Col>
      </Row>
      <Form form={form} layout="vertical" onFinish={onFinish} style={{ maxWidth: 800 }}>
        <DynamicForm<CompanyFormValues>
          schema={schema}
          form={form}
          onFinish={onFinish}
          buttons={
            <Form.Item style={{ marginTop: 24 }}>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={createMutation.isPending || updateMutation.isPending}
                >
                  {t('common.actions.save', 'Lưu')}
                </Button>
                <Button onClick={() => navigate('/company')}>
                  {t('common.actions.cancel', 'Hủy')}
                </Button>
              </Space>
            </Form.Item>
          }
        />
      </Form>
    </Card>
  );
};

export default CompanyFormPage;
