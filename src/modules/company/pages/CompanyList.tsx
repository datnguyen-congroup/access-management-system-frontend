import { EditOutlined, GlobalOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button, Card, Space, Tag, Typography, Tooltip } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { APP_PERMISSIONS } from '@/app/permissions';
import { PermissionGuard } from '@/core/permissions/PermissionGuard';
import { ResponsiveTable, ResponsiveTableProps } from '@/shared/ui/table/ResponsiveTable';

import { Company } from '../hooks';

const MOCK_COMPANIES: Company[] = [
  {
    id: '1',
    name: 'Công ty TNHH Công Nghệ và Dịch Vụ A',
    taxID: '0101234567',
    hotline: ['0901234567', '0243123456'],
    physical_address: 'Số 1, Đường X, Quận Y, TP Hà Nội',
    link_map_address: 'https://maps.google.com/?q=hanoi',
    enabled: true,
  },
  {
    id: '2',
    name: 'Công ty Cổ phần Thương Mại B',
    taxID: '0309876543',
    hotline: ['0919876543'],
    physical_address: 'Số 2, Đường Z, Quận W, TP Hồ Chí Minh',
    enabled: false,
  },
  {
    id: '3',
    name: 'Công ty TNHH Đầu tư C',
    taxID: '0405556667',
    hotline: ['0987654321', '0934567890'],
    physical_address: 'Khu công nghiệp A, Phường B, TP C, Tỉnh D',
    link_map_address: 'https://maps.google.com/?q=hochiminh',
    enabled: true,
  },
  {
    id: '4',
    name: 'Tập đoàn ABC',
    taxID: '0100000001',
    hotline: ['19001560'],
    physical_address: 'Tòa nhà ABC, 123 Đường Láng, Đống Đa, Hà Nội',
    enabled: true,
  },
  {
    id: '5',
    name: 'Công ty Giải pháp Phần mềm XYZ',
    taxID: '0311112222',
    hotline: [],
    physical_address: 'Tầng 5, Tòa nhà XYZ, Quận 1, TP Hồ Chí Minh',
    enabled: false,
  },
];

const { Title, Text, Link } = Typography;

export const CompanyList: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [params, setParams] = useState({ page: 1, pageSize: 10 });

  // const { data, isLoading } = useCompanies(params);

  const columns: ResponsiveTableProps<Company>['columns'] = [
    {
      title: t('company.fields.name'),
      dataIndex: 'name',
      key: 'name',
      width: 250,
      render: (name: string) => <Text strong>{name}</Text>,
    },
    {
      title: t('company.fields.taxID'),
      dataIndex: 'taxID',
      key: 'taxID',
      width: 130,
    },
    {
      title: t('company.fields.hotline'),
      dataIndex: 'hotline',
      key: 'hotline',
      width: 160,
      render: (hotline: string[]) => (
        <Space direction="vertical" size={2}>
          {hotline?.map((phone: string, index: number) => (
            <Space key={index} size={4}>
              <PhoneOutlined style={{ fontSize: 12, color: '#8c8c8c' }} />
              <Text style={{ fontSize: 13 }}>{phone}</Text>
            </Space>
          ))}
          {(!hotline || hotline.length === 0) && '-'}
        </Space>
      ),
    },
    {
      title: t('company.fields.address'),
      dataIndex: 'physical_address',
      key: 'physical_address',
      width: 350,
      render: (address: string, record: Company) => (
        <Space align="start">
          <Text>{address}</Text>
          {record.link_map_address && (
            <Tooltip title={t('common.viewOnMap')}>
              <Link href={record.link_map_address} target="_blank">
                <GlobalOutlined />
              </Link>
            </Tooltip>
          )}
        </Space>
      ),
    },
    {
      title: t('company.fields.enabled'),
      dataIndex: 'enabled',
      key: 'enabled',
      align: 'center',
      width: 120,
      render: (enabled: boolean) => (
        <Tag color={enabled ? 'success' : 'error'}>
          {enabled ? t('common.active') : t('common.inactive')}
        </Tag>
      ),
    },
    {
      title: t('common.table.title.action'),
      key: 'actions',
      align: 'center',
      width: 100,
      render: (_, record: Company) => (
        <Space size="middle">
          <PermissionGuard permissions={APP_PERMISSIONS.COMPANY_EDIT}>
            <Tooltip title={t('common.edit')}>
              <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
            </Tooltip>
          </PermissionGuard>
        </Space>
      ),
    },
  ];

  const handleEdit = (company: Company) => {
    navigate(`/company/${company.id}/edit`);
  };

  const handleTableChange = (pagination: any) => {
    setParams({
      ...params,
      page: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  return (
    <Card bordered={false}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
        <Title level={4} style={{ margin: 0 }}>
          {t('company.title')}
        </Title>
        <PermissionGuard permissions={APP_PERMISSIONS.COMPANY_CREATE}>
          <Button type="primary" onClick={() => navigate('/company/create')}>
            {t('company.actions.create')}
          </Button>
        </PermissionGuard>
      </div>

      <ResponsiveTable<Company>
        columns={columns}
        dataSource={MOCK_COMPANIES}
        rowKey="id"
        loading={false}
        pagination={{
          current: params.page,
          pageSize: params.pageSize,
          total: MOCK_COMPANIES.length,
        }}
        onChange={handleTableChange}
      />
    </Card>
  );
};

export default CompanyList;
