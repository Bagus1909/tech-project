import { Form, Input, Modal, Select, Skeleton } from "antd";
import { IUser } from "../../utils/hooks/useGetAllUser";
import { useEffect, useState } from "react";

type ModalUserEditProps = {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  users: IUser[];
  selectedUser: number | null;
};

const ModalUserEdit = ({ visible, onCancel, onOk, users, selectedUser }: ModalUserEditProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [inputName, setInputName] = useState<string>("");
  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputIsAdmin, setInputIsAdmin] = useState<string>("");

  useEffect(() => {
    const user = users.find((user) => user.id === selectedUser);
    setUser(user || null);
  }, [users]);

  const handleOk = async () => {
    if (user) {
      const updatedUser = {
        ...user,
        name: inputName || user.name,
        email: inputEmail || user.email,
        isAdmin: inputIsAdmin === "admin",
      };

      try {
        const response = await fetch(import.meta.env.VITE_BASE_URL + "users/" + user.id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }

        const data = await response.json();
        console.log("Updated user data:", data);
      } catch (error) {
        console.error("Error updating user data:", error);
      }
    }
    onOk();
  };

  const handleChangeAdmin = (value: string) => {
    setInputIsAdmin(value);
    console.log(inputIsAdmin);
  };

  return (
    <Modal
      title='Edit User'
      open={visible}
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form layout='vertical'>
        <Form.Item
          label='Name'
          name='name'
        >
          {user ? (
            <Input
              type='text'
              placeholder='Enter name'
              defaultValue={user.name}
              onChange={(e) => setInputName(e.target.value)}
            />
          ) : (
            <Skeleton.Input
              active
              size='small'
              style={{ width: 200 }}
            />
          )}
        </Form.Item>
        <Form.Item
          label='Email'
          name='email'
        >
          {user ? (
            <Input
              type='email'
              placeholder='Enter email'
              defaultValue={user.email}
              onChange={(e) => setInputEmail(e.target.value)}
            />
          ) : (
            <Skeleton.Input
              active
              size='small'
              style={{ width: 200 }}
            />
          )}
        </Form.Item>
        <Form.Item
          label='isAdmin'
          name='isAdmin'
        >
          {user ? (
            <Select
              defaultValue={user?.isAdmin ? "admin" : "user"}
              onChange={(e) => handleChangeAdmin(e)}
            >
              <Select.Option value='admin'>Admin</Select.Option>
              <Select.Option value='user'>User</Select.Option>
            </Select>
          ) : (
            <Skeleton.Input
              active
              size='small'
              style={{ width: 200 }}
            />
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalUserEdit;
