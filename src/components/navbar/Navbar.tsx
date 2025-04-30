import { Button } from "antd";
import "./navbar.less";

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between'>
      <h1>EMS</h1>
      <Button>Logout</Button>
    </nav>
  );
};

export default Navbar;
