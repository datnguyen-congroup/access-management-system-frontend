import { APP_PERMISSIONS } from '@/app/permissions';
import { APP_ROUTES } from '@/app/settings';
import { PermissionGuard } from '@/core/permissions/PermissionGuard';
import { buildPath } from '@/core/utils';
import { ResponsiveTable, ResponsiveTableProps } from '@/shared/ui/table/ResponsiveTable';
import { ReloadOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

const { Title } = Typography;

type User = {
  key: string;
  name: string;
  version: string;
  status: string;
};

const WorkflowList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const dataSource = [
    { key: '1', name: 'work 1', version: '1.0.1', status: 'active' },
    { key: '2', name: 'work 2', version: '1.0.1', status: 'active' },
  ];

  const columns: ResponsiveTableProps<User>['columns'] = [
    { title: t('common.table.title.name'), dataIndex: 'name', key: 'name' },
    { title: t('common.table.title.version'), dataIndex: 'version', key: 'version' },
    { title: t('common.table.title.status'), dataIndex: 'status', key: 'status' },
    {
      title: t('common.table.title.action'),
      key: 'action',
      render: () => (
        <Space size="middle">
          <PermissionGuard permissions={APP_PERMISSIONS.WORKFLOW_EDIT}>
            <Button
              type="primary"
              variant="outlined"
              onClick={() => navigate(buildPath(APP_ROUTES.workflow.detail, { id: 1 }))}
            >
              {t('common.actions.edit')}
            </Button>
          </PermissionGuard>
          <PermissionGuard permissions={APP_PERMISSIONS.WORKFLOW_DELETE}>
            <Button danger variant="outlined">
              {t('common.actions.delete')}
            </Button>
          </PermissionGuard>
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 16,
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <Title level={4} style={{ margin: 0 }}>
          {t('menu.workflow.list')}
        </Title>
        <Flex gap={12}>
          <PermissionGuard permissions={APP_PERMISSIONS.WORKFLOW_CREATE}>
            <Button type="primary" onClick={() => navigate(APP_ROUTES.workflow.create)}>
              {t('common.actions.create')}
            </Button>
          </PermissionGuard>
          <Button icon={<ReloadOutlined />}>{t('common.actions.refetch')}</Button>
        </Flex>
      </div>
      <ResponsiveTable<User>
        columns={columns}
        dataSource={dataSource}
        rowKey="key"
        loading={false}
        pagination={{ current: 1, pageSize: 10, total: 100 }}
      />
    </Card>
  );
};

export default WorkflowList;
