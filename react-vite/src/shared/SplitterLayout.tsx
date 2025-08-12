import { Menu, Splitter } from 'antd';
import { Outlet, useLocation } from 'react-router';
import { routeConfig } from '@/route';
import { makeMenu } from 'shared-react-tsup';

export function SplitterLayout() {
  const location = useLocation();
  const items = makeMenu(routeConfig);

  return (
    <>
      <Splitter lazy style={{ height: '100vh', width: '100vw' }}>
        <Splitter.Panel defaultSize={300} collapsible>
          <Menu style={{ height: '100%' }} mode='inline' items={items} selectedKeys={[location.pathname]} />
        </Splitter.Panel>
        <Splitter.Panel>
          <div style={{ height: '100%', marginLeft: '16px', padding: '16px' }}>
            <Outlet />
          </div>
        </Splitter.Panel>
      </Splitter>
    </>
  );
}
