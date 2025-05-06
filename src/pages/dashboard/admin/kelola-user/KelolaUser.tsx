import { Button, message, Popconfirm, Space, Table, TableProps, Tag } from "antd";
import HeaderDashbord from "../../../../components/header-dashboard/HeaderDashbord";
import useGetAllUser from "../../../../utils/useGetAllUser";
import { useState } from "react";
import ModalUserEdit from "../../../../components/modals/ModalUserEdit";
import ModalUserAdd from "../../../../components/modals/ModalUserAdd";

interface DataType {
  key: string | number;
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
  tags: string[];
}

const KelolaUser = () => {
  const { user, error, refetch } = useGetAllUser();
  const [modalUserEdit, setModalUserEdit] = useState<boolean>(false);
  const [modalUserAdd, setModalUserAdd] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [localError, setLocalError] = useState<Error | null>(null);
  const [modalMode, setModalMode] = useState<"edit" | "add" | null>(null);
  const handleModalEditUser = (id: number) => {
    setSelectedUser(id);
    setModalMode("edit");
  };
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(import.meta.env.VITE_BASE_URL + "users/" + id, {
        method: "DELETE",
      });

      if (!response.ok) {
        setLocalError(error);
        throw new Error("Network response was not ok " + response.statusText);
      }

      message.success("User deleted successfully");
      refetch();
    } catch (error) {
      setLocalError(new Error("Failed to delete user"));
      message.error(localError?.message ?? "Fail to delete user");
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
          <Button
            onClick={() => {
              setModalMode("edit");
              handleModalEditUser(record.id);
            }}
          >
            Edit {record.name}
          </Button>
          <Popconfirm
            title='Delete User'
            description='Are you sure to delete this user?'
            onConfirm={() => handleDelete(record.id)}
            onCancel={() => message.error("Delete cancelled")}
          >
            <Button danger>Delete {record.name}</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const modal =
    modalMode === "edit" ? (
      <ModalUserEdit
        visible={modalMode === "edit"}
        onCancel={() => setModalMode(null)}
        onOk={() => {
          setModalMode(null);
          refetch();
        }}
        users={user}
        selectedUser={selectedUser}
      />
    ) : modalMode === "add" ? (
      <ModalUserAdd
        visible={modalMode === "add"}
        onCancel={() => setModalMode(null)}
        onOk={() => {
          setModalMode(null);
          refetch();
        }}
      />
    ) : null;

  console.log("User data received:", user);

  return (
    <div>
      <HeaderDashbord title='Kelola User' />
      <div style={{ padding: "8px 20px" }}>
        <Button
          className='mb-2'
          type='primary'
          onClick={() => setModalMode("add")}
        >
          Tambah User
        </Button>
        <Table
          columns={columns}
          dataSource={user.map((u) => ({
            ...u,
            key: u.id || u.email,
          }))}
        />
      </div>
      {modal}
      {/* {modalUserEdit && (
        <ModalUserEdit
          visible={modalUserEdit}
          onCancel={() => setModalUserEdit(false)}
          onOk={() => {
            setModalUserEdit(false);
            refetch();
          }}
          users={user}
          selectedUser={selectedUser}
        />
      )}
      {modalUserAdd && (
        <ModalUserEdit
          visible={modalUserAdd}
          onCancel={() => setModalUserAdd(false)}
          onOk={() => {
            setModalUserAdd(false);
            refetch();
          }}
          users={user}
          selectedUser={selectedUser}
        />
      )} */}
    </div>
  );
};

export default KelolaUser;
