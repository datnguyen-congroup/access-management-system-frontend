import { DashboardOutlined, FormOutlined, TableOutlined, UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { APP_ROUTES } from './settings';

export const useAppMenu = () => {
  const { t } = useTranslation();

  return [
    {
      key: APP_ROUTES.dashboard,
      icon: <DashboardOutlined />,
      label: t('menu.dashboard'),
    },
    {
      key: APP_ROUTES.forms.index,
      icon: <FormOutlined />,
      label: t('menu.forms'),
      children: [
        {
          key: APP_ROUTES.forms.basic,
          label: t('menu.formsBasic'),
        },
      ],
    },
    {
      key: APP_ROUTES.list.index,
      icon: <TableOutlined />,
      label: t('menu.list'),
      children: [
        {
          key: APP_ROUTES.list.standard,
          label: t('menu.listStandard'),
        },
      ],
    },
    {
      key: APP_ROUTES.users,
      icon: <UserOutlined />,
      label: t('menu.users'),
    },
    {
      key: APP_ROUTES.workflow.index,
      icon: <TableOutlined />,
      label: t('menu.workflowManagement'),
    },
  ];
};
