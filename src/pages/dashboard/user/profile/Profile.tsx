import { Card } from "antd";
import HeaderDashbord from "../../../../components/header-dashboard/HeaderDashbord";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state: any) => state.userData);
  const userData = user.value;
  console.log("userData", userData);

  return (
    <>
      <HeaderDashbord title='Profile' />
      <div style={{ padding: "8px 20px" }}>
        <Card>
          <p>Username: {userData.name}</p>
          <p>Email: {userData.email} </p>
        </Card>
      </div>
    </>
  );
};

export default Profile;
