import React from 'react';
import { Table, Button, Space, Typography, Card } from 'antd';
import { PermissionGuard } from '../../../core/permissions/PermissionGuard';
import { APP_PERMISSIONS } from '../../../app/permissions';

const { Title } = Typography;

export const UserList: React.FC = () => {
  const dataSource = [
    { key: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { key: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  ];

  const columns = [
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
      <Table dataSource={dataSource} columns={columns} />
    </Card>
  );
};

export default UserList;
