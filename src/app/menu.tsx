import React from 'react';
import { DashboardOutlined, UserOutlined, FormOutlined, TableOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

export const useAppMenu = () => {
  const { t } = useTranslation();

  return [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: t('menu.dashboard'),
    },
    {
      key: '/forms',
      icon: <FormOutlined />,
      label: t('menu.forms'),
      children: [
        {
          key: '/forms/basic',
          label: t('menu.formsBasic'),
        },
      ],
    },
    {
      key: '/list',
      icon: <TableOutlined />,
      label: t('menu.list'),
      children: [
        {
          key: '/list/standard',
          label: t('menu.listStandard'),
        },
      ],
    },
    {
      key: '/users',
      icon: <UserOutlined />,
      label: t('menu.users'),
    },
  ];
};
