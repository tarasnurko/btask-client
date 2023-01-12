import { Task, TaskStatus } from "@/data/task";
import {
  ChangeLeadTasks,
  changeLeadTasks,
  ChangeLeadTasksError,
  getLeadTasks,
  GetLeadTasks,
  GetLeadTasksError,
} from "@/fetch/index";
import { Button, Col, Divider, message, Row, Space, Spin } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useQueryClient, useMutation, useQuery } from "react-query";

const Component: React.FC = () => {
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();
  const [enabled, setEnabled] = useState<boolean>(false);

  const router = useRouter();
  const leadId =
    typeof router.query.leadId === "string" ? router.query.leadId : "";

  const onError = (error: ChangeLeadTasksError) => {
    messageApi.open({
      type: "error",
      content: error?.response?.data.message,
    });
  };

  const {
    data: tasks,
    isLoading,
    isSuccess,
  } = useQuery<GetLeadTasks, GetLeadTasksError, Task[], any>({
    queryKey: ["leadTasks", leadId],
    queryFn: () => getLeadTasks({ leadId }),
    enabled,
  });

  const { mutate, isLoading: isChanging } = useMutation<
    Task[],
    ChangeLeadTasksError,
    ChangeLeadTasks
  >(changeLeadTasks, {
    onMutate: async ({ tasks }) => {
      await queryClient.cancelQueries({ queryKey: ["leadTasks", leadId] });

      const previousTasks = queryClient.getQueryData<Task[]>([
        "leadTasks",
        leadId,
      ]);

      if (previousTasks) {
        queryClient.setQueryData<Task[]>(
          ["leadTasks", leadId],
          [
            ...previousTasks.map((task, index) => {
              task.status = tasks[index];
              return task;
            }),
          ]
        );
      }

      return { previousTasks };
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["leadTasks", leadId],
      });

      queryClient.invalidateQueries({
        queryKey: ["nextTasks"],
      });
    },
    onError,
  });

  const handleTaskChange = (taskIndex: number, currentStatus: TaskStatus) => {
    if (!tasks || isLoading || isChanging || !leadId) return;
    if (currentStatus === TaskStatus.Inactive) return;

    if (currentStatus === TaskStatus.Next) {
      const taskStatuses = tasks.map((task) => task.status);

      taskStatuses[taskIndex] = TaskStatus.Done;

      if (taskIndex !== 4) {
        taskStatuses[taskIndex + 1] = TaskStatus.Next;
      }

      mutate({ leadId, tasks: taskStatuses });

      return;
    }

    if (currentStatus === TaskStatus.Deleted) {
      const taskStatuses = tasks.map((task) => task.status);

      taskStatuses[taskIndex] = TaskStatus.Done;

      if (taskIndex !== 4) {
        taskStatuses[taskIndex + 1] = TaskStatus.Next;
      }

      mutate({ leadId, tasks: taskStatuses });

      return;
    }

    if (currentStatus === TaskStatus.Done) {
      let taskStatuses = tasks.map((task) => task.status);

      taskStatuses[taskIndex] = TaskStatus.Deleted;

      if (taskIndex !== 4) {
        taskStatuses = taskStatuses.map((status, index) =>
          index > taskIndex ? TaskStatus.Inactive : status
        );
      }

      mutate({ leadId, tasks: taskStatuses });
      return;
    }
  };

  useEffect(() => {
    if (!leadId) {
      return;
    }

    setEnabled(true);
  }, [leadId]);

  return (
    <>
      {contextHolder}
      <Space direction="vertical" style={{ width: "100%", marginTop: "30px" }}>
        <Row>
          <Col span={24}>
            {isSuccess &&
              tasks.map((task, index) => {
                const Line = (
                  <Row justify="center">
                    <Col>
                      <Divider
                        type="vertical"
                        style={{ height: "50px", margin: "10px 0" }}
                      />
                    </Col>
                  </Row>
                );

                return (
                  <React.Fragment key={index}>
                    <Row justify="center">
                      <Col>
                        <Button
                          type="primary"
                          ghost={task.status === TaskStatus.Next}
                          danger={task.status === TaskStatus.Deleted}
                          disabled={task.status === TaskStatus.Inactive}
                          onClick={() => handleTaskChange(index, task.status)}
                        >
                          {task.text}
                        </Button>
                      </Col>
                    </Row>
                    {index !== 4 && Line}
                  </React.Fragment>
                );
              })}
          </Col>
        </Row>
      </Space>
      {(isLoading || !tasks) && <Spin size="large" />}
    </>
  );
};

export default Component;
