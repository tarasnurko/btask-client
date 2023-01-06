import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";

import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, message } from "antd";

import { emailRules, passwordRules } from "./rules";
import { IError, IForm, loginUrl } from "./data";
import { IAuthRes } from "../../../data/auth";

const initialValues: IForm = {
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

const login = async (data: IForm): Promise<any> => {
  return await axios.post(loginUrl, data, { withCredentials: true });
};

const Component: React.FC = () => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const onError = (error: IError) => {
    messageApi.open({
      type: "error",
      content: error?.response?.data.message,
    });
  };

  const { mutate, isLoading } = useMutation<IAuthRes, IError, IForm>(login, {
    onSuccess: () => {
      router.push("/");
    },
    onError,
  });

  const handleSubmit = async (values: IForm) => {
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
