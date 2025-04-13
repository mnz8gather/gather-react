import { Layout, Menu } from 'antd';
import { Outlet, useLocation } from 'react-router';
import { makeMenu } from 'shared-react-tsup';
import { routeConfig } from '@/route';
import styles from './index.module.less';

const { Content, Sider } = Layout;

export function CustomLayout() {
  const location = useLocation();
  const items = makeMenu(routeConfig);

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider theme='light' width={300} className={styles['sider']}>
        <Menu style={{ height: '100vh' }} mode='inline' items={items} selectedKeys={[location.pathname]} />
      </Sider>
      <Content style={{ marginLeft: '16px', padding: '16px' }}>
        <Outlet />
      </Content>
    </Layout>
  );
}
