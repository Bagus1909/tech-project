import { Layout } from "antd";
import Navbar from "../../components/navbar/Navbar";

const { Header, Content, Sider, Footer } = Layout;

const Dashboard = () => {
  return (
    <>
      <Layout>
        <Header style={{ backgroundColor: "#fff" }}>
          <Navbar />
        </Header>
        <Layout>
          <Sider theme='light'>Sider</Sider>
          <Content style={{ height: "100vh" }}>Content</Content>{" "}
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    </>
  );
};

export default Dashboard;
