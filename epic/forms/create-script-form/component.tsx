import { Script, ScriptSource } from "@/data/script";
import { createScript, CreateScript, CreateScriptError } from "@/fetch/index";
import { Button, Form, Input, message, Select } from "antd";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { linkRules, nameRules, sourceRules } from "./rules";

const initialValues: CreateScript = {
  name: "",
  source: ScriptSource.Upwork,
  link: "",
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

  const onError = (error: CreateScriptError) => {
    messageApi.open({
      type: "error",
      content: error?.response?.data.message,
    });
  };

  const { mutate, isLoading } = useMutation<
    Script,
    CreateScriptError,
    CreateScript
  >(createScript, {
    onSuccess: () => {
      router.push("/scripts");
    },
    onError,
  });

  const handleSubmit = (values: CreateScript) => {
    mutate(values);
  };

  return (
    <>
      {contextHolder}
      <Form
        style={{ width: "100%" }}
        name="script"
        initialValues={initialValues}
        onFinish={handleSubmit}
        {...layout}
      >
        <Form.Item name="name" label="Name" rules={nameRules}>
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="source" label="Source" rules={sourceRules}>
          <Select>
            <Select.Option value={ScriptSource.Upwork}>Upwork</Select.Option>
            <Select.Option value={ScriptSource.Telegram}>
              Telegram
            </Select.Option>
            <Select.Option value={ScriptSource.Linkedin}>
              Linkedin
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="link" label="Link" rules={linkRules}>
          <Input placeholder="Link" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Create Script
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Component;
