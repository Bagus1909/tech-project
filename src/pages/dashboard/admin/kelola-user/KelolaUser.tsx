import { Button, Space, Table, TableProps, Tag } from "antd";
import HeaderDashbord from "../../../../components/header-dashboard/HeaderDashbord";
import useGetAllUser from "../../../../utils/useGetAllUser";
import ModalEditUser from "../../../../components/modals/ModalEditUser";
import { useState } from "react";

interface DataType {
  key: string | number;
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
  tags: string[];
}

const KelolaUser = () => {
  const { user } = useGetAllUser();
  const [modalUser, setModalUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  const handleModalEditUser = (id: number) => {
    setSelectedUser(id);
    setModalUser(true);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "isAdmin",
      dataIndex: "isAdmin",
      key: "isAdmin",
      render: (isAdmin) => <Tag color={isAdmin ? "green" : "blue"}>{isAdmin ? "Admin" : "User"}</Tag>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size='middle'>
          <Button onClick={() => handleModalEditUser(record.id)}>Edit {record.name}</Button>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  console.log("User data received:", user);

  return (
    <div>
      <HeaderDashbord title='Kelola User' />
      <div style={{ padding: "8px 20px" }}>
        <Table
          columns={columns}
          dataSource={user.map((u) => ({
            ...u,
            key: u.id || u.email,
          }))}
        />
      </div>
      {modalUser && (
        <ModalEditUser
          visible={modalUser}
          onCancel={() => setModalUser(false)}
          onOk={() => setModalUser(false)}
          users={user}
          selectedUser={selectedUser}
        />
      )}
    </div>
  );
};

export default KelolaUser;
