import { Breadcrumb } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router';

export const AppBreadcrumb = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const pathSnippets = location.pathname.split('/').filter((i) => i);

  const breadcrumbItems = [
    {
      title: <Link to="/">{t('menu.home')}</Link>,
      key: 'home',
    },
    ...pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      const isLast = index === pathSnippets.length - 1;
      const title = pathSnippets[index].charAt(0).toUpperCase() + pathSnippets[index].slice(1);

      return {
        title: isLast ? title : <Link to={url}>{title}</Link>,
        key: url,
      };
    }),
  ];

  return <Breadcrumb items={breadcrumbItems} style={{ marginBottom: 16 }} />;
};
