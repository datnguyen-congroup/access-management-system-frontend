import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Layout,
  Menu,
  Button,
  Dropdown,
  Avatar,
  theme,
  Typography,
  Space,
  Drawer,
  Grid,
} from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  BgColorsOutlined,
  SettingOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/core/store/authStore';
import { useThemeStore } from '@/core/store/themeStore';
import { useSettingsStore } from '@/core/store/settingsStore';
import { useAppMenu } from '@/app/menu';
import { appSettings } from '@/app/settings';
import { AppBreadcrumb } from '@/shared/components/AppBreadcrumb';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;
const { useBreakpoint } = Grid;

export const MainLayout: React.FC = () => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation();
  const screens = useBreakpoint();

  const isMobile = screens.xs || (screens.sm && !screens.md);

  const { user, logout } = useAuthStore();
  const { mode, toggleTheme } = useThemeStore();
  const { sidebarCollapsed, toggleSidebar, mobileMenuOpen, setMobileMenuOpen } = useSettingsStore();

  const appMenu = useAppMenu();

  const handleMenuClick = (info: { key: string }) => {
    navigate(info.key);
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const langMenu = {
    items: [
      { key: 'en', label: 'English', onClick: () => changeLanguage('en') },
      { key: 'vi', label: 'Tiếng Việt', onClick: () => changeLanguage('vi') },
    ],
  };

  const userMenu = {
    items: [
      { key: 'profile', label: 'Profile', icon: <UserOutlined /> },
      { key: 'settings', label: 'Settings', icon: <SettingOutlined /> },
      {
        key: 'theme',
        label: `Theme: ${mode.toUpperCase()}`,
        icon: <BgColorsOutlined />,
        onClick: toggleTheme,
      },
      { type: 'divider' as const },
      {
        key: 'logout',
        label: 'Logout',
        icon: <LogoutOutlined />,
        onClick: () => {
          logout();
          navigate('/login');
        },
      },
    ],
  };

  const BrandLogo = () => (
    <div
      style={{
        height: 64,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          background: token.colorPrimary,
          borderRadius: 6,
          flexShrink: 0,
        }}
      />
      {(!sidebarCollapsed || isMobile) && (
        <Text
          strong
          style={{
            marginLeft: 12,
            fontSize: 16,
            color: mode === 'dark' ? '#fff' : 'inherit',
            whiteSpace: 'nowrap',
          }}
        >
          {appSettings.appName}
        </Text>
      )}
    </div>
  );

  const SiderContent = (
    <Sider
      trigger={null}
      collapsible
      collapsed={isMobile ? false : sidebarCollapsed}
      theme={mode}
      width={256}
      style={{
        boxShadow: '2px 0 8px 0 rgba(29,35,41,.05)',
        zIndex: 10,
        height: '100%',
        position: isMobile ? 'relative' : 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <BrandLogo />
      <Menu
        theme={mode}
        mode="inline"
        selectedKeys={[location.pathname]}
        defaultOpenKeys={['/forms', '/list']}
        items={appMenu}
        onClick={handleMenuClick}
        style={{ borderRight: 0 }}
      />
    </Sider>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {isMobile ? (
        <Drawer
          placement="left"
          closable={false}
          onClose={() => setMobileMenuOpen(false)}
          open={mobileMenuOpen}
          styles={{ body: { padding: 0 } }}
          width={256}
        >
          {SiderContent}
        </Drawer>
      ) : (
        <>
          {SiderContent}
          <div
            style={{ width: sidebarCollapsed ? 80 : 256, flexShrink: 0, transition: 'all 0.2s' }}
          />
        </>
      )}

      <Layout style={{ minHeight: '100vh' }}>
        <Header
          style={{
            padding: '0 24px 0 0',
            background: token.colorBgContainer,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 1px 4px rgba(0,21,41,.08)',
            zIndex: 9,
            position: 'sticky',
            top: 0,
          }}
        >
          <Button
            type="text"
            icon={
              isMobile ? (
                <MenuUnfoldOutlined />
              ) : sidebarCollapsed ? (
                <MenuUnfoldOutlined />
              ) : (
                <MenuFoldOutlined />
              )
            }
            onClick={() => (isMobile ? setMobileMenuOpen(true) : toggleSidebar())}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
          <Space size={screens.xs ? 8 : 20}>
            <Dropdown menu={langMenu} placement="bottomRight">
              <Button type="text" icon={<GlobalOutlined />} />
            </Dropdown>
            <Dropdown menu={userMenu} placement="bottomRight">
              <Space style={{ cursor: 'pointer', paddingRight: 8 }}>
                <Avatar style={{ backgroundColor: token.colorPrimary }} icon={<UserOutlined />} />
                {!screens.xs && <span style={{ fontWeight: 500 }}>{user?.fullName || 'User'}</span>}
              </Space>
            </Dropdown>
          </Space>
        </Header>
        <Content
          style={{ margin: screens.xs ? '16px' : '24px', display: 'flex', flexDirection: 'column' }}
        >
          {!screens.xs && <AppBreadcrumb />}
          <div
            style={{
              flex: 1,
              padding: screens.xs ? 16 : 24,
              background: token.colorBgContainer,
              borderRadius: token.borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
