import axios, { AxiosError } from "axios";
import { Auth } from "@/data/auth";
import { baseUrl } from "../";

export type LoginError = AxiosError<{ message: string }>;

export interface Login {
  email: string;
  password: string;
}

const url = `${baseUrl}/auth/login`;

export const login = async (data: Login): Promise<Auth> => {
  return await axios.post(url, data, { withCredentials: true });
};
