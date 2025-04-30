import { AppstoreAddOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, Tag } from "antd";
import { NavLink } from "react-router-dom";

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

const items = [
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
const Sidebar = () => {
  return (
    <>
      <Menu
        className='sidebar-menu'
        items={items}
        defaultSelectedKeys={["main"]}
        mode='inline'
        inlineIndent={16}
      />
    </>
  );
};

export default Sidebar;
