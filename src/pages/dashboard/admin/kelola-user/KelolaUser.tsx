import { Button, message, Space, Table, TableProps, Tag } from "antd";
import HeaderDashbord from "../../../../components/header-dashboard/HeaderDashbord";
import useGetAllUser from "../../../../utils/useGetAllUser";
import ModalEditUser from "../../../../components/modals/ModalEditUser";
import { use, useEffect, useState } from "react";

interface DataType {
  key: string | number;
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
  tags: string[];
}

const KelolaUser = () => {
  const { user, error, loading, refetch } = useGetAllUser();
  const [modalUser, setModalUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleModalEditUser = (id: number) => {
    setSelectedUser(id);
    setModalUser(true);
  };
  const handleDelete = async (id: number) => {
    setDeleteLoading(true);
    try {
      const response = await fetch(import.meta.env.VITE_BASE_URL + "users/" + id, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      message.success("User deleted successfully");
      refetch();
    } catch (error) {
      console.error("Error deleting user:", error);
      message.error("Failed to delete user");
    } finally {
      setDeleteLoading(false);
    }
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
          <Button
            onClick={() => handleDelete(record.id)}
            danger
            disabled={deleteLoading}
          >
            Delete {record.name}
          </Button>
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
          onOk={() => {
            setModalUser(false);
            refetch();
          }}
          users={user}
          selectedUser={selectedUser}
        />
      )}
    </div>
  );
};

export default KelolaUser;
