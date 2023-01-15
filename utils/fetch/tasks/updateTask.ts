import axios, { AxiosError } from "axios";
import { Task } from "@/data/task";
import { baseUrl } from "../baseUrl";

export type UpdateTaskError = AxiosError<{ message?: string }>;

export enum TaskUpdateStatus {
  Done = "done",
  Deleted = "deleted",
}

export interface UpdateTask {
  status: TaskUpdateStatus;
  taskId: number;
}

const url = `${baseUrl}/tasks`;

export const updateTask = async ({
  status,
  taskId,
}: UpdateTask): Promise<Task> => {
  return await axios
    .patch(
      `${url}/${taskId}`,
      {
        status,
      },
      {
        withCredentials: true,
      }
    )
    .then((res) => res.data);
};
