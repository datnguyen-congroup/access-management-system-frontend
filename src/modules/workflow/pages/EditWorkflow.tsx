import { Form, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import { message } from '@/core/utils/antd';
import { WorkflowForm } from '../components/WorkflowForm';

const { Title } = Typography;

const EditWorkflow = () => {
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
        <Title level={3}>{t('menu.workflow.edit')}</Title>
      </div>
      <WorkflowForm form={form} onFinish={onFinish} />
    </div>
  );
};

export default EditWorkflow;
