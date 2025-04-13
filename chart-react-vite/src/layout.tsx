import { Layout, Menu } from 'antd';
import { Outlet, useLocation, Link } from 'react-router';
import { styled } from 'styled-components';
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const { Content, Sider } = Layout;

const StyledSider = styled(Sider)`
  height: 100vh;
  overflow: hidden;
`;

const StyledContent = styled(Content)`
  margin-left: 16px;
  padding: 16px;
`;

const StyledLayout = styled(Layout)`
  height: 100vh;
`;

// theme prop is not passed down to styled component
// https://github.com/styled-components/styled-components/issues/4182

export function AppLayout() {
  const location = useLocation();
  const items: MenuItem[] = [{ label: <Link to={'/'}>主页</Link>, key: '/' }];

  return (
    <StyledLayout>
      <StyledSider theme="light" width={300}>
        <Menu mode="inline" items={items} selectedKeys={[location.pathname]} />
      </StyledSider>
      <StyledContent>
        <Outlet />
      </StyledContent>
    </StyledLayout>
  );
}
