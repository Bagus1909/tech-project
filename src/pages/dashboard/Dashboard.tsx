import { Layout } from "antd";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { MenuFoldOutlined } from "@ant-design/icons";
import "./dashboard.less";

const { Header, Content, Sider } = Layout;

const Dashboard = () => {
  return (
    <>
      <Layout>
        <Header className='dashboard-header'>
          <Navbar />
        </Header>
        <Layout className='dashboard-layout'>
          <Sider
            className='dashboard-sider'
            theme='light'
            collapsible
            trigger={<MenuFoldOutlined />}
            width={200}
          >
            <Sidebar />
          </Sider>
          <Layout>
            <Content style={{ height: "100vh" }}>
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default Dashboard;
