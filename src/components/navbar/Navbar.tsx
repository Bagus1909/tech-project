import { Button, Skeleton, Typography } from "antd";
import "./navbar.less";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/slice/userData";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [activeUser, setActiveUser] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { Text } = Typography;

  const handleLogout = () => {
    dispatch(setUserData({ value: false }));
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("isAdmin");
    sessionStorage.removeItem("userData");
    navigate("/login");
  };
  const getName = () => {
    const userData = sessionStorage.getItem("userData");
    const parsedData = userData ? JSON.parse(userData) : null;
    setActiveUser(parsedData?.name || "");
  };
  useEffect(() => {
    getName();
  }, []);
  return (
    <nav className='flex items-center justify-between'>
      <h1>EMS</h1>
      <div>
        <Text className='text-sm mr-2'>
          Welcome,
          {activeUser ? (
            ` ${activeUser}`
          ) : (
            <Skeleton.Input
              active
              size='small'
              style={{ width: 100 }}
            />
          )}
        </Text>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </nav>
  );
};

export default Navbar;
