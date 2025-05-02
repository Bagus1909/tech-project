import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, message, Modal } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../../redux/slice/userData";
import "./login.less";
import { useState } from "react";

// email: bagussetiawan@hotmail.com
// password: CtOGtW8LyQHHPqm

type FieldType = {
  email?: string;
  password?: string;
  remember?: boolean;
};

const Login = () => {
  const [error, setError] = useState("");

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Form values:", values);

    try {
      const response = await fetch(import.meta.env.VITE_BASE_URL + "users");
      const data = await response.json();

      const userRes = data.find((user: any) => user.email === values.email);

      if (userRes) {
        console.log("User found:", userRes);
        if (userRes.password === values.password) {
          console.log("Login successful");
          dispatch(setUserData({ ...values, email: userRes.email, name: userRes.name }));
          navigate("/main");
          message.success("Login successful!");
        } else {
          console.log("Login failed - incorrect password");
          setError("Incorrect password. Please try again.");
        }
      } else {
        console.log("User not found");
        setError("User not found. Please check your email.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("An error occurred while fetching user data. Please try again later.");
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Please fill all required fields correctly.");
  };

  return (
    <div className='login-wrapper'>
      <div className='login-container'>
        <h1 className='text-2xl font-bold text-center mb-6'>Login</h1>
        {error && (
          <div className='error-message'>
            <p>{error}</p>
          </div>
        )}
        <Form
          form={form}
          name='login'
          layout='vertical'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
          className='login-form'
        >
          <Form.Item<FieldType>
            label='Email'
            name='email'
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email address" },
            ]}
          >
            <Input
              placeholder='email@example.com'
              className='login-input'
            />
          </Form.Item>

          <Form.Item<FieldType>
            label='Password'
            name='password'
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder='your password'
              className='login-input'
            />
          </Form.Item>

          <Form.Item<FieldType>
            name='remember'
            valuePropName='checked'
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className='w-full'
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
