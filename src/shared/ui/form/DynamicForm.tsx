import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  CheckboxProps,
  Col,
  DatePicker,
  DatePickerProps,
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
import React from 'react';
import { useTranslation } from 'react-i18next';
type InputTypeMap = {
  input: InputProps;
  number: InputNumberProps;
  select: SelectProps;
  date: DatePickerProps;
  dateRange: RangePickerProps; // range
  checkbox: CheckboxProps;
  radio: RadioGroupProps;
  switch: SwitchProps;
  upload: UploadProps;
};

type BaseField = {
  name: string;
  label?: React.ReactNode;
  rules?: Rule[];
  colSpan?: number;
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
  | (BaseField & { inputType: 'custom'; render: () => React.ReactNode });

type FormSchema = FieldSchema[][];

export interface DynamicFormProps {
  schema: FormSchema;
  form?: FormInstance;
  onFinish?: (values: Record<string, unknown>) => void;
  buttons?: React.ReactNode;
}

const { useBreakpoint } = Grid;
const { RangePicker } = DatePicker;

export const DynamicForm = ({ schema, form, onFinish, buttons }: DynamicFormProps) => {
  const { t } = useTranslation();
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const renderInput = (field: FieldSchema) => {
    switch (field.inputType) {
      case 'input':
        return <Input {...field.inputProps} />;

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

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      {schema.map((row, rowIndex) => (
        <Row gutter={16} key={rowIndex}>
          {row.map((field) => (
            <Col span={isMobile ? 24 : (field.colSpan ?? 24 / row.length)} key={field.name}>
              <Form.Item name={field.name} label={field.label} rules={field.rules}>
                {renderInput(field)}
              </Form.Item>
            </Col>
          ))}
        </Row>
      ))}
      {buttons}
    </Form>
  );
};
