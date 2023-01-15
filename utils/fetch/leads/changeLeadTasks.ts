import axios, { AxiosError } from "axios";
import { Task, TaskStatus } from "@/data/task";
import { baseUrl } from "../baseUrl";

export type ChangeLeadTasksError = AxiosError<{ message?: string }>;

export interface ChangeLeadTasks {
  tasks: TaskStatus[];
  leadId: string | number;
}

const url = `${baseUrl}/leads`;

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
