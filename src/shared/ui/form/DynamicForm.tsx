import { UploadOutlined } from '@ant-design/icons';
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
  buttons?: React.ReactNode;
}

const { useBreakpoint } = Grid;
const { RangePicker } = DatePicker;

export const DynamicForm = ({ schema, form, onFinish, buttons }: DynamicFormProps) => {
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

  const renderNestedArray = (field: ArrayField, parentIndex: number) => (
    <Form.List name={[parentIndex, field.name]}>
      {(fields, { add, remove }) => (
        <>
          {fields.map((f) => (
            <div key={f.key} style={{ marginBottom: 8 }}>
              {field.fields.map((row, rowIndex) => (
                <Row gutter={8} key={rowIndex}>
                  {row.map((child) => (
                    <Col span={24} key={child.name}>
                      <Form.Item name={[f.name, child.name]} rules={child.rules}>
                        {renderInput(child)}
                      </Form.Item>
                    </Col>
                  ))}
                </Row>
              ))}

              <Flex justify="flex-end">
                <Button danger onClick={() => remove(f.name)}>
                  {t('common.actions.remove')} {field.label}
                </Button>
              </Flex>
            </div>
          ))}

          <Flex justify="center">
            <Button type="dashed" onClick={() => add()}>
              {t('common.actions.add')} {field.label}
            </Button>
          </Flex>
        </>
      )}
    </Form.List>
  );

  const renderArrayField = (field: ArrayField) => (
    <Form.List name={field.name}>
      {(fields, { add, remove }) => (
        <>
          {fields.map((f) => (
            <Card
              key={f.key}
              style={{ marginBottom: 16, padding: 24 }}
              styles={{ body: { padding: 0 } }}
            >
              {field.fields.map((row, rowIndex) => (
                <Row gutter={16} key={rowIndex}>
                  {row.map((child) => {
                    const isCheckboxOrSwitch =
                      child.inputType === 'checkbox' || child.inputType === 'switch';

                    return (
                      <Col
                        key={child.name}
                        span={isMobile ? 24 : (child.colSpan ?? 24 / row.length)}
                      >
                        <Form.Item
                          name={[f.name, child.name]}
                          label={child.label}
                          rules={child.rules}
                          valuePropName={isCheckboxOrSwitch ? 'checked' : undefined}
                          getValueFromEvent={
                            child.inputType === 'upload' ? (e) => e.fileList : undefined
                          }
                        >
                          {/* support nested array */}
                          {child.inputType === 'array'
                            ? renderNestedArray(child, f.name)
                            : renderInput(child)}
                        </Form.Item>
                      </Col>
                    );
                  })}
                </Row>
              ))}

              <Flex justify="flex-end">
                <Button danger onClick={() => remove(f.name)}>
                  {t('common.actions.remove')} {field.label}
                </Button>
              </Flex>
            </Card>
          ))}

          <Flex justify="center">
            <Button type="dashed" onClick={() => add()} block>
              {t('common.actions.add')} {field.label}
            </Button>
          </Flex>
        </>
      )}
    </Form.List>
  );

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      {schema.map((row, rowIndex) => (
        <Row gutter={16} key={rowIndex}>
          {row.map((field) => {
            const isCheckboxOrSwitch =
              field.inputType === 'checkbox' || field.inputType === 'switch';

            return (
              <Col span={isMobile ? 24 : (field.colSpan ?? 24 / row.length)} key={field.name}>
                <Form.Item
                  name={field.name}
                  label={field.label}
                  rules={field.rules}
                  valuePropName={isCheckboxOrSwitch ? 'checked' : undefined}
                  getValueFromEvent={field.inputType === 'upload' ? (e) => e.fileList : undefined}
                >
                  {field.inputType === 'array' ? renderArrayField(field) : renderInput(field)}
                </Form.Item>
              </Col>
            );
          })}
        </Row>
      ))}
      {buttons}
    </Form>
  );
};
