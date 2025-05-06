import { Form, Input, message, Modal, Select } from "antd";
import { useForm } from "antd/es/form/Form";

type ModalUserAddProps = {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
};

const ModalUserAdd = ({ visible, onCancel, onOk }: ModalUserAddProps) => {
  const [form] = useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      console.log("Form values:", values);
      const newUser = {
        ...values,
        password: Math.random().toString(36).slice(-8),
        isAdmin: values.isAdmin === "admin",
        createdAt: new Date().toISOString(),
      };

      console.log("New user data:", newUser);

      const reponse = await fetch(import.meta.env.VITE_BASE_URL + "users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!reponse.ok) {
        throw new Error("Network response was not ok " + reponse.statusText);
      }

      message.success("User added successfully");
      form.resetFields();
      onOk();
    } catch (error) {
      message.error("Failed to add user");
      console.error("Error adding user:", error);
    }
  };
  return (
    <Modal
      title='Tambah User'
      open={visible}
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form
        layout='vertical'
        form={form}
      >
        <Form.Item
          label='Name'
          name='name'
          rules={[{ required: true, message: "Please enter a name" }]}
        >
          <Input
            type='text'
            placeholder='Enter name'
          />
        </Form.Item>
        <Form.Item
          label='Email'
          name='email'
          rules={[
            { required: true, message: "Please enter an email" },
            { type: "email", message: "Enter a valid email" },
          ]}
        >
          <Input
            type='email'
            placeholder='Enter email'
          />
        </Form.Item>
        <Form.Item
          label='Role'
          name='isAdmin'
          rules={[{ required: true, message: "Please select a role" }]}
        >
          <Select placeholder='Select role'>
            <Select.Option value='admin'>Admin</Select.Option>
            <Select.Option value='user'>User</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalUserAdd;
