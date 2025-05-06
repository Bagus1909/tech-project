import { AppstoreAddOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, Tag } from "antd";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

type LabelSidebarProp = {
  path: string;
  label: string;
  tag?: string;
};

const LabelSidebar = ({ path, label, tag }: LabelSidebarProp) => {
  return (
    <NavLink to={path}>
      <span>{label}</span>
      {tag === "baru" && (
        <Tag
          className='tagSoon'
          color='error'
        >
          Baru!
        </Tag>
      )}
    </NavLink>
  );
};

const Sidebar = () => {
  const user = useSelector((state: any) => state.userData.value);

  const location = useLocation();

  const isAdmin = user.isAdmin;
  const path = location.pathname;
  console.log("path", path);

  const AdminItems = [
    {
      key: "/admin/main",
      icon: <AppstoreAddOutlined />,
      label: (
        <LabelSidebar
          path='admin/main'
          label='Dashboard'
        />
      ),
    },
    {
      key: "/admin/profile",
      icon: <UserOutlined />,
      label: (
        <LabelSidebar
          path='admin/profile'
          label='Profile'
        />
      ),
    },
    {
      key: "/admin/kelola-user",
      icon: <UserOutlined />,
      label: (
        <LabelSidebar
          path='admin/kelola-user'
          label='Kelola User'
        />
      ),
    },
  ];

  const Useritems = [
    {
      key: "main",
      icon: <AppstoreAddOutlined />,
      label: (
        <LabelSidebar
          path='main'
          label='Dashboard'
        />
      ),
    },
    {
      key: "profile",
      icon: <UserOutlined />,
      label: (
        <LabelSidebar
          path='profile'
          label='Profile'
        />
      ),
    },
  ];

  const items = isAdmin ? AdminItems : Useritems;
  return (
    <>
      <Menu
        className='sidebar-menu'
        items={items}
        defaultSelectedKeys={[path]}
        mode='inline'
        inlineIndent={16}
      />
    </>
  );
};

export default Sidebar;
