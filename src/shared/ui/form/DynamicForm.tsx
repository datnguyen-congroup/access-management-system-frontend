import { DeleteOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Checkbox,
  CheckboxProps,
  Col,
  DatePicker,
  DatePickerProps,
  Flex,
  Form,
  Grid,
  Input,
  InputNumber,
  InputNumberProps,
  InputProps,
  Radio,
  RadioGroupProps,
  Row,
  Select,
  SelectProps,
  Switch,
  SwitchProps,
  Upload,
  UploadProps,
} from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import type { FormInstance, Rule } from 'antd/es/form';
import { TextAreaProps } from 'antd/es/input';
import React from 'react';
import { useTranslation } from 'react-i18next';

const { TextArea } = Input;

type InputTypeMap = {
  input: InputProps;
  number: InputNumberProps;
  select: SelectProps;
  date: DatePickerProps;
  dateRange: RangePickerProps;
  checkbox: CheckboxProps;
  radio: RadioGroupProps;
  switch: SwitchProps;
  upload: UploadProps;
  textarea: TextAreaProps;
};

type BaseField = {
  name: string;
  label?: React.ReactNode;
  rules?: Rule[];
  colSpan?: number;
};

type ArrayField = BaseField & {
  inputType: 'array';
  fields: FieldSchema[][];
};

type FieldSchema =
  | (BaseField & { inputType: 'input'; inputProps?: InputTypeMap['input'] })
  | (BaseField & { inputType: 'number'; inputProps?: InputTypeMap['number'] })
  | (BaseField & { inputType: 'select'; inputProps?: InputTypeMap['select'] })
  | (BaseField & { inputType: 'date'; inputProps?: InputTypeMap['date'] })
  | (BaseField & { inputType: 'dateRange'; inputProps?: InputTypeMap['dateRange'] })
  | (BaseField & { inputType: 'checkbox'; inputProps?: InputTypeMap['checkbox'] })
  | (BaseField & { inputType: 'radio'; inputProps?: InputTypeMap['radio'] })
  | (BaseField & { inputType: 'switch'; inputProps?: InputTypeMap['switch'] })
  | (BaseField & { inputType: 'upload'; inputProps?: InputTypeMap['upload'] })
  | (BaseField & { inputType: 'textarea'; inputProps?: InputTypeMap['textarea'] })
  | (BaseField & { inputType: 'custom'; render: () => React.ReactNode })
  | ArrayField;

type FormSchema = FieldSchema[][];

export interface DynamicFormProps {
  schema: FormSchema;
  form?: FormInstance;
  onFinish?: (values: Record<string, unknown>) => void;
  initialValues?: Record<string, unknown>;
  buttons?: React.ReactNode;
}

const { useBreakpoint } = Grid;
const { RangePicker } = DatePicker;

export const DynamicForm = ({
  schema,
  form,
  onFinish,
  initialValues,
  buttons,
}: DynamicFormProps) => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const { t } = useTranslation();

  const renderInput = (field: FieldSchema) => {
    switch (field.inputType) {
      case 'input':
        return <Input {...field.inputProps} />;

      case 'textarea':
        return <TextArea {...field.inputProps} />;

      case 'number':
        return <InputNumber style={{ width: '100%' }} {...field.inputProps} />;

      case 'select':
        return <Select {...field.inputProps} />;

      case 'date':
        return <DatePicker style={{ width: '100%' }} {...field.inputProps} />;

      case 'dateRange':
        return <RangePicker style={{ width: '100%' }} {...field.inputProps} />;

      case 'checkbox':
        return <Checkbox {...field.inputProps} />;

      case 'radio':
        return <Radio.Group {...field.inputProps} />;

      case 'switch':
        return <Switch {...field.inputProps} />;

      case 'upload':
        return (
          <Upload listType="picture" {...field.inputProps}>
            <Button type="primary" icon={<UploadOutlined />}>
              {t('common.actions.upload')}
            </Button>
          </Upload>
        );

      case 'custom':
        return field.render();

      default:
        return null;
    }
  };

  /**
   * Render a recursive array field using Form.List
   */
  const renderArray = (field: ArrayField, namePath: (string | number)[], depth: number) => (
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
  const renderField = (field: FieldSchema, namePath: (string | number)[], depth: number) => {
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
