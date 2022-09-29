import { Link, Outlet, useAppData, useLocation } from 'umi';
import { Layout, Menu } from 'antd';

const { Content, Sider } = Layout;

const UmiLayout: React.FC = () => {
  const { routes } = useAppData();
  const collator = new Intl.Collator('en');
  const location = useLocation();

  const items = Object.entries(routes)
    .filter(([, value]) => !(value.id === '@@/global-layout' || value.id === '404'))
    .sort(([x], [y]) => collator.compare(x, y))
    .map(([, value]) => {
      if (value.path === '/') {
        return {
          label: <Link to={value.path}>{value.id}</Link>,
          key: value.path,
        };
      }
      return {
        label: <Link to={value.path!}>{value.path}</Link>,
        key: '/' + value.path,
      };
    });

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="light">
        <Menu mode="inline" items={items} defaultSelectedKeys={[location.pathname]} />
      </Sider>
      <Content style={{ margin: '0 16px' }}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default UmiLayout;
