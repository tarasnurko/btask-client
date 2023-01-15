import axios, { AxiosError } from "axios";
import { baseUrl } from "../baseUrl";

export type DeleteScriptError = AxiosError<{ message?: string }>;

const url = `${baseUrl}/scripts`;

export const deleteScript = async (scriptId: number): Promise<void> => {
  return axios.delete(`${url}/${scriptId}`, {
    withCredentials: true,
  });
};
