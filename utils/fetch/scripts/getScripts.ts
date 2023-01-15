import { Script } from "@/data/script";
import axios, { AxiosError } from "axios";
import { baseUrl } from "../baseUrl";

export type GetScriptsError = AxiosError<{ message?: string }>;

export interface GetScripts {
  jwt?: string;
}

const url = `${baseUrl}/scripts`;

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
