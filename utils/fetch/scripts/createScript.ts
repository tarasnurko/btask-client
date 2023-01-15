import axios, { AxiosError } from "axios";
import { Script, ScriptSource } from "@/data/script";
import { baseUrl } from "../baseUrl";

export type CreateScriptError = AxiosError<{ message?: string }>;

export interface CreateScript {
  name: string;
  source: ScriptSource;
  link: string;
}

const url = `${baseUrl}/scripts`;

export const createScript = async (data: CreateScript): Promise<Script> => {
  return await axios.post(url, data, { withCredentials: true });
};
