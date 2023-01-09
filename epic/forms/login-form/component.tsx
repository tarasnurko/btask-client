import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "react-query";

import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, message } from "antd";

import { emailRules, passwordRules } from "./rules";
import { LoginError, LoginForm } from "./data";
import { AuthRes } from "../../../data/auth";
import { login } from "@/fetch/index";

const initialValues: LoginForm = {
  email: "",
  password: "",
};

const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 16,
    md: { span: 12 },
    lg: { span: 8 },
  },
};

const Component: React.FC = () => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const onError = (error: LoginError) => {
    messageApi.open({
      type: "error",
      content: error?.response?.data.message,
    });
  };

  const { mutate, isLoading } = useMutation<AuthRes, LoginError, LoginForm>(
    login,
    {
      onSuccess: () => {
        router.push("/");
      },
      onError,
    }
  );

  const handleSubmit = async (values: LoginForm) => {
    mutate(values);
  };

  return (
    <>
      {contextHolder}
      <Form
        style={{ width: "100%" }}
        name="login"
        initialValues={initialValues}
        onFinish={handleSubmit}
        {...layout}
      >
        <Form.Item name="email" label="E-mail" rules={emailRules} hasFeedback>
          <Input prefix={<UserOutlined />} placeholder="E-mail" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={passwordRules}
          hasFeedback
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Log in
            </Button>
            <Link href="./signup">Or Sign up now!</Link>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default Component;
