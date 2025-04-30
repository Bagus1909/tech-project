import React, { useState } from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";

type FieldType = {
  email?: string;
  password?: string;
  remember?: boolean;
};

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Form values:", values);

    try {
      const response = await fetch(import.meta.env.VITE_BASE_URL + "users");
      const data = await response.json();

      const userRes = data.find((user: any) => user.email === values.email);

      if (userRes) {
        if (userRes.password === values.password) {
          console.log("Login successful");
          message.success("Login successful!");
          navigate("/main");
        } else {
          console.log("Login failed - incorrect password");
          message.error("Incorrect password. Please try again.");
        }
      } else {
        console.log("User not found");
        message.error("User not found. Please check your email.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("An error occurred. Please try again later.");
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Please fill all required fields correctly.");
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <div className='p-8 bg-white rounded-lg shadow-md w-96'>
        <h1 className='text-2xl font-bold text-center mb-6'>Login</h1>
        <Form
          form={form}
          name='login'
          layout='vertical'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item<FieldType>
            label='Email'
            name='email'
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email address" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label='Password'
            name='password'
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
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
