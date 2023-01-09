import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useMutation } from "react-query";

import { Button, Form, Input, Space, message, Select, InputNumber } from "antd";

import { CreateLeadForm, CreateLeadError } from "./data";

import { nameRules, sourceRules, contactsRules, nextTaskRules } from "./rules";
import { Lead, LeadSource } from "@/data/lead";
import { TaskTextArr } from "@/data/task";
import { createLead } from "@/fetch/index";

const initialValues: CreateLeadForm = {
  name: "",
  source: LeadSource.Upwork,
  nextTask: 1,
  contacts: "",
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

  const onError = (error: CreateLeadError) => {
    messageApi.open({
      type: "error",
      content: error?.response?.data.message,
    });
  };

  const { mutate, isLoading } = useMutation<
    Lead,
    CreateLeadError,
    CreateLeadForm
  >(createLead, {
    onSuccess: () => {
      router.push("/");
    },
    onError,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (values: CreateLeadForm) => {
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
        <Form.Item name="name" label="Name" rules={nameRules}>
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="source" label="Source" rules={sourceRules}>
          <Select>
            <Select.Option value={LeadSource.Upwork}>Upwork</Select.Option>
            <Select.Option value={LeadSource.Telegram}>Telegram</Select.Option>
            <Select.Option value={LeadSource.Linkedin}>Linkedin</Select.Option>
          </Select>
        </Form.Item>
        {mounted && (
          <Form.Item name="minBudget" label="Min Budget">
            <InputNumber min={0} placeholder="0" />
          </Form.Item>
        )}
        {mounted && (
          <Form.Item name="maxBudget" label="Max Budget">
            <InputNumber min={0} placeholder="100000" />
          </Form.Item>
        )}
        <Form.Item name="nextTask" label="Next Task" rules={nextTaskRules}>
          <Select>
            {TaskTextArr.map((task, index) => (
              <Select.Option value={index + 1} key={index}>
                {task}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="contacts" label="Contacts" rules={contactsRules}>
          <Input placeholder="Contacts" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Create Lead
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Component;
