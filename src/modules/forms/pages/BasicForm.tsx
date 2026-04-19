import React from 'react';
import {
  Card,
  Form,
  Input,
  DatePicker,
  InputNumber,
  Button,
  Select,
  Radio,
  Space,
  Typography,
  message,
} from 'antd';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

export const BasicForm: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const onFinish = (values: Record<string, unknown>) => {
    console.log('Form values:', values);
    message.success('Successfully submitted form!');
    form.resetFields();
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <div style={{ marginBottom: 24, textAlign: 'center' }}>
        <Title level={3}>Basic Form</Title>
        <Text type="secondary">
          Form pages are used to collect or verify information to users, and basic forms are common
          in scenarios where there are fewer data items.
        </Text>
      </div>

      <Card bordered={false} style={{ boxShadow: '0 1px 2px -2px rgba(0,0,0,0.16)' }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ publicType: 'public', weight: 0 }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please enter a title' }]}
          >
            <Input placeholder="Give the target a name" />
          </Form.Item>

          <Form.Item
            label="Date Range"
            name="dateRange"
            rules={[{ required: true, message: 'Please select the date range' }]}
          >
            <RangePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Goal Description"
            name="goal"
            rules={[{ required: true, message: 'Please enter a goal description' }]}
          >
            <TextArea rows={4} placeholder="Please enter your work goals" />
          </Form.Item>

          <Form.Item
            label="Metrics"
            name="metrics"
            rules={[{ required: true, message: 'Please enter a metric' }]}
          >
            <TextArea rows={4} placeholder="Please enter a metric to evaluate" />
          </Form.Item>

          <Form.Item label="Client (Optional)" name="client">
            <Input placeholder="Please describe your customer service, internal customers directly @ Name / job number" />
          </Form.Item>

          <Form.Item label="Inviting Critics (Optional)" name="critics">
            <Select mode="multiple" placeholder="Please select inviting critics">
              <Select.Option value="lisa">Lisa</Select.Option>
              <Select.Option value="tom">Tom</Select.Option>
              <Select.Option value="jerry">Jerry</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Weight (Optional)" name="weight">
            <InputNumber min={0} max={100} style={{ width: 160 }} addonAfter="%" />
          </Form.Item>

          <Form.Item label="Target Disclosure" name="publicType">
            <Radio.Group>
              <Radio value="public">Public</Radio>
              <Radio value="partial">Partially public</Radio>
              <Radio value="private">Private</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item style={{ marginTop: 32 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                {t('common.actions.submit')}
              </Button>
              <Button onClick={() => form.resetFields()}>{t('common.actions.cancel')}</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default BasicForm;
