import React from "react";

import { Button, message, Popconfirm, Spin, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";

import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  GetNextTasks,
  getNextTasks,
  GetNextTasksError,
  GetNextTasksRes,
  TaskUpdateStatus,
  UpdateTask,
  updateTask,
  UpdateTaskError,
} from "@/fetch/index";

import { Task } from "@/data/task";

const { Text } = Typography;

const Component: React.FC = () => {
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();

  const onError = (error: UpdateTaskError) => {
    messageApi.open({
      type: "error",
      content: error?.response?.data.message,
    });
  };

  const { data: tasks, isLoading: tasksIsLoading } = useQuery<
    GetNextTasks,
    GetNextTasksError,
    GetNextTasksRes[],
    any
  >({
    queryKey: ["nextTasks"],
    queryFn: getNextTasks,
  });

  const { mutate, isLoading: isUpdating } = useMutation<
    Task,
    UpdateTaskError,
    UpdateTask
  >(updateTask, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["nextTasks"] });
      queryClient.invalidateQueries({ queryKey: ["leadTask", data.leadId] });
    },
    onError,
  });

  const handleMake = (taskId: number) => {
    mutate({ status: TaskUpdateStatus.Done, taskId });
  };

  const handleDelete = (taskId: number) => {
    mutate({ status: TaskUpdateStatus.Deleted, taskId });
  };

  const columns: ColumnsType<GetNextTasksRes> = [
    {
      title: "Lead",
      key: "lead",
      render: (_, record) => {
        return record.lead.name;
      },
    },
    {
      title: "Task Name",
      dataIndex: "text",
      key: "text",
    },
    {
      title: "Make Task",
      key: "makeTask",
      render: (_, record) => (
        <Popconfirm
          title="Make the task"
          description="Are you sure to make this task?"
          okText="Make"
          cancelText="Cancel"
          okButtonProps={{ type: "primary" }}
          onConfirm={() => handleMake(record.id)}
        >
          <Button type="primary" ghost>
            Make
          </Button>
        </Popconfirm>
      ),
    },
    {
      title: "Delete Task",
      key: "deleteTask",
      render: (_, record) => (
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          okText="Delete"
          cancelText="Cancel"
          okButtonProps={{ danger: true }}
          onConfirm={() => handleDelete(record.id)}
        >
          <Button danger ghost>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
    {
      title: "Hold Days",
      dataIndex: "createdAt",
      key: "holdDays",
      render: (value: string) => {
        const difference = Math.floor(
          (Date.now() - new Date(value).getTime()) / (1000 * 3600 * 24)
        );

        if (difference === 0) {
          return <Text>{difference}</Text>;
        }

        if (difference === 1) {
          return <Text type="warning">{difference}</Text>;
        }

        return <Text type="danger">{difference}</Text>;
      },
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={tasks}
      rowKey="id"
      scroll={{ x: true }}
      loading={tasksIsLoading || isUpdating}
    />
  );
};

export default Component;
