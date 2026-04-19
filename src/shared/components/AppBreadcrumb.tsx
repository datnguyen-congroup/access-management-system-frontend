import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';

export const AppBreadcrumb = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter((i) => i);

  const breadcrumbItems = [
    {
      title: <Link to="/">Home</Link>,
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
