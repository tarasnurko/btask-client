import { Lead } from "@/data/lead";
import { Script } from "@/data/script";
import { Task } from "@/data/task";
import axios, { AxiosError } from "axios";

export type GetScriptsError = AxiosError<{ message?: string }>;

export interface GetScripts {
  jwt?: string;
}

const url = "http://127.0.0.1:8080/api/scripts";

export const getScripts = async ({ jwt }: GetScripts): Promise<Script[]> => {
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
