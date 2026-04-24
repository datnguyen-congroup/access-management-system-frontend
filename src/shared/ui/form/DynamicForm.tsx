import { DeleteOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Flex,
  Form,
  Grid,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Switch,
  Upload,
} from 'antd';
import type { FormInstance } from 'antd/es/form';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FieldSchema, FormInputEnum, FormSchema } from './types';

const { TextArea } = Input;

export interface DynamicFormProps<T extends Record<string, any> = any> {
  schema: FormSchema<T>;
  form?: FormInstance<T>;
  onFinish?: (values: T) => void;
  initialValues?: Partial<T>;
  buttons?: React.ReactNode;
}

const { useBreakpoint } = Grid;
const { RangePicker } = DatePicker;

export const DynamicForm = <T extends Record<string, any> = any>({
  schema,
  form,
  onFinish,
  initialValues,
  buttons,
}: DynamicFormProps<T>) => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const { t } = useTranslation();

  const renderInput = (field: FieldSchema<any>) => {
    switch (field.inputType) {
      case FormInputEnum.input:
        return <Input {...field.inputProps} />;

      case FormInputEnum.textarea:
        return <TextArea {...field.inputProps} />;

      case FormInputEnum.number:
        return <InputNumber style={{ width: '100%' }} {...field.inputProps} />;

      case FormInputEnum.select:
        return <Select {...field.inputProps} />;

      case FormInputEnum.date:
        return <DatePicker style={{ width: '100%' }} {...field.inputProps} />;

      case FormInputEnum.dateRange:
        return <RangePicker style={{ width: '100%' }} {...field.inputProps} />;

      case FormInputEnum.checkbox:
        return <Checkbox {...field.inputProps} />;

      case FormInputEnum.radio:
        return <Radio.Group {...field.inputProps} />;

      case FormInputEnum.switch:
        return <Switch {...field.inputProps} />;

      case FormInputEnum.upload:
        return (
          <Upload listType="picture" {...field.inputProps}>
            <Button type="primary" icon={<UploadOutlined />}>
              {t('common.actions.upload')}
            </Button>
          </Upload>
        );

      case FormInputEnum.custom:
        return field.render();

      default:
        return null;
    }
  };

  /**
   * Render a recursive array field using Form.List
   */
  const renderArray = (
    field: Extract<FieldSchema<any>, { inputType: 'array' }>,
    namePath: (string | number)[],
    depth: number,
  ) => (
    <Form.List name={namePath}>
      {(fields, { add, remove }) => (
        <>
          {fields.map((f, index) => (
            <Card
              key={f.key}
              size="small"
              title={field.label ? `${field.label} #${index + 1}` : undefined}
              extra={
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => remove(f.name)}
                />
              }
              style={{ marginBottom: 16 }}
              styles={{ body: { padding: '16px 24px' } }}
            >
              {field.fields.map((row, rowIndex) => (
                <Row gutter={16} key={rowIndex}>
                  {row.map((child) => (
                    <Col key={child.name} span={isMobile ? 24 : (child.colSpan ?? 24 / row.length)}>
                      {/* Recursive call to render child fields */}
                      {renderField(child, [f.name, child.name], depth + 1)}
                    </Col>
                  ))}
                </Row>
              ))}
            </Card>
          ))}

          <Flex justify="center">
            <Button
              type="dashed"
              onClick={() => add()}
              block
              icon={<PlusOutlined />}
              style={{ marginBottom: 16 }}
            >
              {t('common.actions.add')} {field.label}
            </Button>
          </Flex>
        </>
      )}
    </Form.List>
  );

  /**
   * Helper to render any FieldSchema (Input or Array)
   */
  const renderField = (field: FieldSchema<any>, namePath: (string | number)[], depth: number) => {
    const isCheckboxOrSwitch = field.inputType === 'checkbox' || field.inputType === 'switch';

    // Logic for labels: root (depth 0) and first-level array items (depth 1) show labels.
    const label = depth > 1 ? undefined : field.label;

    if (field.inputType === 'array') {
      return (
        <Form.Item name={namePath} label={label} rules={field.rules} style={{ marginBottom: 8 }}>
          {renderArray(field, namePath, depth)}
        </Form.Item>
      );
    }

    return (
      <Form.Item
        name={namePath}
        label={label}
        rules={field.rules}
        valuePropName={isCheckboxOrSwitch ? 'checked' : undefined}
        getValueFromEvent={
          field.inputType === 'upload' ? (e: { fileList: unknown[] }) => e.fileList : undefined
        }
      >
        {renderInput(field)}
      </Form.Item>
    );
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} initialValues={initialValues} preserve>
      {schema.map((row, rowIndex) => (
        <Row gutter={16} key={rowIndex}>
          {row.map((field) => (
            <Col span={isMobile ? 24 : (field.colSpan ?? 24 / row.length)} key={field.name}>
              {renderField(field, [field.name], 0)}
            </Col>
          ))}
        </Row>
      ))}
      {buttons}
    </Form>
  );
};
