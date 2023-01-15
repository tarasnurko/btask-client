import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { Button, Form, Input, Space, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { emailRules, passwordRules } from "./rules";
import { signup, LoginError, Signup, SignupError } from "@/fetch/index";
import { Auth } from "@/data/auth";

const initialValues: Signup = {
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

  const { mutate, isLoading } = useMutation<Auth, SignupError, Signup>(signup, {
    onSuccess: () => {
      router.push("/");
    },
    onError,
  });

  const handleSubmit = async (values: Signup) => {
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
              Sign up
            </Button>
            <Link href="./login">Or login now!</Link>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default Component;
