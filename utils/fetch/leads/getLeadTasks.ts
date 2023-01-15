import { Task, TaskStatus } from "@/data/task";
import axios, { AxiosError } from "axios";
import { baseUrl } from "../";

export type GetLeadTasksError = AxiosError<{ message?: string }>;

export interface GetLeadTasks {
  leadId: string | number;
}

const url = `${baseUrl}/leads`;

export const getLeadTasks = async ({
  leadId,
}: GetLeadTasks): Promise<Task[]> => {
  return await axios
    .get(`${url}/${leadId}/tasks`, {
      withCredentials: true,
    })
    .then((res) => res.data);
};
