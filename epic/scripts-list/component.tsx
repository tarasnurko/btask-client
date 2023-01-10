import { Script, ScriptSource } from "@/data/script";
import {
  getScripts,
  GetScripts,
  GetScriptsError,
  deleteScript,
  DeleteScriptError,
} from "@/fetch/index";

import {
  Button,
  Divider,
  List,
  message,
  Popconfirm,
  Skeleton,
  Space,
  Typography,
} from "antd";
import Link from "next/link";
import React, { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

const { Text, Title } = Typography;

const Component: React.FC = () => {
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();

  const onError = (error: GetScriptsError) => {
    messageApi.open({
      type: "error",
      content: error?.response?.data.message,
    });
  };

  const { data: scripts, isLoading: scriptsIsLoading } = useQuery<
    GetScripts,
    GetScriptsError,
    Script[],
    any
  >({
    queryKey: ["scripts"],
    queryFn: getScripts,
  });

  const { mutate, isLoading: isDeleting } = useMutation<
    void,
    DeleteScriptError,
    number
  >(deleteScript, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scripts"] });
    },
    onError,
  });

  const handleDelete = (scriptId: number) => {
    mutate(scriptId);
  };

  const upworkScrpts = useMemo(() => {
    return scripts?.filter((script) => script.source === ScriptSource.Upwork);
  }, [scripts]);

  const telegramScripts = useMemo(() => {
    return scripts?.filter((script) => script.source === ScriptSource.Telegram);
  }, [scripts]);

  const linkedinScripts = useMemo(() => {
    return scripts?.filter((script) => script.source === ScriptSource.Linkedin);
  }, [scripts]);

  const renderItem = (item: Script) => (
    <List.Item
      actions={[
        <Popconfirm
          key="list-script-delete"
          title="Delete the script"
          description="Are you sure to delete this script?"
          okText="Delete"
          cancelText="Cancel"
          okButtonProps={{ danger: true }}
          onConfirm={() => handleDelete(item.id)}
        >
          <Button danger ghost>
            Delete
          </Button>
        </Popconfirm>,
      ]}
    >
      <Skeleton loading={scriptsIsLoading} active>
        <Link href={item.link}>
          <Text>{item.name}</Text>
        </Link>
      </Skeleton>
    </List.Item>
  );

  return (
    <>
      {contextHolder}
      <Space direction="vertical" style={{ width: "100%" }}>
        <List
          loading={isDeleting}
          header={<Title level={3}>Upwork</Title>}
          dataSource={upworkScrpts}
          renderItem={renderItem}
        />
        <List
          loading={isDeleting}
          header={<Title level={3}>Telegram</Title>}
          dataSource={telegramScripts}
          renderItem={renderItem}
        />
        <List
          loading={isDeleting}
          header={<Title level={3}>Linkedin</Title>}
          dataSource={linkedinScripts}
          renderItem={renderItem}
        />
      </Space>
    </>
  );
};

export default Component;
