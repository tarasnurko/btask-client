import axios, { AxiosError } from "axios";
import { Task, TaskStatus } from "@/data/task";

export type ChangeLeadTasksError = AxiosError<{ message?: string }>;

export interface ChangeLeadTasks {
  tasks: TaskStatus[];
  leadId: string | number;
}

const url = "http://127.0.0.1:8080/api/leads";

export const changeLeadTasks = async ({
  tasks,
  leadId,
}: ChangeLeadTasks): Promise<Task[]> => {
  return await axios.patch(
    `${url}/${leadId}/tasks`,
    { tasks },
    { withCredentials: true }
  );
};
