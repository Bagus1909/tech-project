import { Button } from "antd";
import "./navbar.less";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/slice/userData";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setUserData({ value: false }));
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("isAdmin");
    sessionStorage.removeItem("userData");
    navigate("/login");
  };
  return (
    <nav className='flex items-center justify-between'>
      <h1>EMS</h1>
      <Button onClick={handleLogout}>Logout</Button>
    </nav>
  );
};

export default Navbar;
