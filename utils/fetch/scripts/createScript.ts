import axios, { AxiosError } from "axios";
import { Script, ScriptSource } from "@/data/script";

export type CreateScriptError = AxiosError<{ message?: string }>;

export interface CreateScript {
  name: string;
  source: ScriptSource;
  link: string;
}

const url = "http://127.0.0.1:8080/api/scripts";

export const createScript = async (data: CreateScript): Promise<Script> => {
  return await axios.post(url, data, { withCredentials: true });
};
