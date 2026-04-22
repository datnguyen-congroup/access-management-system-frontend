import { Button, Card, Space, Typography } from 'antd';
import React from 'react';

import { APP_PERMISSIONS } from '@/app/permissions';
import { PermissionGuard } from '@/core/permissions/PermissionGuard';
import { ResponsiveTable, ResponsiveTableProps } from '@/shared/ui/table/ResponsiveTable';

const { Title } = Typography;

type User = {
  key: string;
  name: string;
  email: string;
  role: string;
};

export const UserList: React.FC = () => {
  const dataSource = [
    { key: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { key: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  ];

  const columns: ResponsiveTableProps<User>['columns'] = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <PermissionGuard permissions={APP_PERMISSIONS.USERS_EDIT}>
            <Button type="link">Edit</Button>
          </PermissionGuard>
          <PermissionGuard permissions={APP_PERMISSIONS.USERS_DELETE}>
            <Button type="link" danger>
              Delete
            </Button>
          </PermissionGuard>
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={4} style={{ margin: 0 }}>
          Users
        </Title>
        <PermissionGuard permissions={APP_PERMISSIONS.USERS_CREATE}>
          <Button type="primary">Add User</Button>
        </PermissionGuard>
      </div>
      <ResponsiveTable<User>
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
        loading={false}
        pagination={{ current: 1, pageSize: 10, total: 100 }}
        // mobileRender={(record) => (
        //   <>
        //     <div style={{ fontWeight: 600 }}>{record.name}</div>
        //     <div>{record.role}</div>
        //   </>
        // )}
      />
    </Card>
  );
};

export default UserList;
