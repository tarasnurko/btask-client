import axios, { AxiosError } from "axios";

export type DeleteScriptError = AxiosError<{ message?: string }>;

const url = "http://127.0.0.1:8080/api/scripts";

export const deleteScript = async (scriptId: number): Promise<void> => {
  return axios.delete(`${url}/${scriptId}`, {
    withCredentials: true,
  });
};
