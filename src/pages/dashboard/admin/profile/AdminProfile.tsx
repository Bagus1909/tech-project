import { Card, Descriptions } from "antd";
import HeaderDashbord from "../../../../components/header-dashboard/HeaderDashbord";
import { useSelector } from "react-redux";

const AdminProfile = () => {
  const user = useSelector((state: any) => state.userData.value);
  console.log("[ADMIN PROFILE] userData : ", user);
  return (
    <>
      <HeaderDashbord title='Profile' />
      <div style={{ padding: "8px 20px" }}>
        <Card
          loading={!user}
          title='Informasi Akun'
        >
          <Descriptions
            column={1}
            layout='horizontal'
          >
            <Descriptions.Item label='Nama'>{user.name}</Descriptions.Item>
            <Descriptions.Item label='Email'>{user.email}</Descriptions.Item>
            <Descriptions.Item label='Role'>{user.isAdmin ? "Admin" : "User"}</Descriptions.Item>
          </Descriptions>
        </Card>
        ?
      </div>
    </>
  );
};

export default AdminProfile;
