import { Card } from "antd";
import React, { useEffect } from "react";
import HeaderDashbord from "../../../../components/header-dashboard/HeaderDashbord";

const Profile = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_BASE_URL + "users");
        const data = await response.json();
        console.log(data);
        const userRes = data.find((user: any) => user.name === "Bagus Setiawan");
        console.log(userRes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  });
  return (
    <>
      <HeaderDashbord title='Profile' />
      <div style={{ padding: "8px 20px" }}>
        <Card>
          <p>Username: JohnDoe</p>
          <p>Email:</p>
        </Card>
      </div>
    </>
  );
};

export default Profile;
