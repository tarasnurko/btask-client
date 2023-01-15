import { Lead } from "@/data/lead";
import { Task } from "@/data/task";
import axios, { AxiosError } from "axios";
import { baseUrl } from "../baseUrl";

export type GetNextTasksError = AxiosError<{ message?: string }>;

export interface GetNextTasksRes extends Task {
  lead: Lead;
}

export interface GetNextTasks {
  jwt?: string;
}

const url = `${baseUrl}/tasks`;

export const getNextTasks = async ({
  jwt,
}: GetNextTasks): Promise<GetNextTasksRes[]> => {
  if (!jwt) {
    return await axios
      .get(url, {
        withCredentials: true,
      })
      .then((res) => res.data);
  }

  return await axios
    .get(url, {
      withCredentials: true,
      headers: {
        Cookie: `jwt=${jwt}`,
      },
    })
    .then((res) => res.data);
};
