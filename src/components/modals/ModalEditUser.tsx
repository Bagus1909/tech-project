import { Form, Input, Modal, Select, Skeleton } from "antd";
import { IUser } from "../../utils/useGetAllUser";
import { useEffect, useState } from "react";

type ModalEditUserProps = {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  users: IUser[];
  selectedUser: number | null;
};

const ModalEditUser = ({ visible, onCancel, onOk, users, selectedUser }: ModalEditUserProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  useEffect(() => {
    const user = users.find((user) => user.id === selectedUser);
    setUser(user || null);
  }, [users]);

  console.log("Selected user:", user);

  return (
    <Modal
      title='Edit User'
      open={visible}
      onCancel={onCancel}
      onOk={onOk}
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
            <Select defaultValue={user?.isAdmin ? "admin" : "user"}>
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

export default ModalEditUser;
