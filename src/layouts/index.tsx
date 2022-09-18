import { Link, Outlet, useAppData } from "umi";
import { Layout, Menu } from "antd";

const { Content, Sider } = Layout;

const UmiLayout: React.FC = () => {
  const { routes } = useAppData();

  const items = Object.entries(routes)
    .filter(([, value]) => value.id !== "@@/global-layout")
    .map(([key, value]) => ({
      label: <Link to={value.path!}>{value.id}</Link>,
      key,
    }));

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider theme="light">
        <Menu mode="inline" items={items} />
      </Sider>
      <Content style={{ margin: "0 16px" }}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default UmiLayout;
