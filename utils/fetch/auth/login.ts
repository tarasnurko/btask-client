import axios, { AxiosError } from "axios";
import { Auth } from "@/data/auth";

export type LoginError = AxiosError<{ message: string }>;

export interface Login {
  email: string;
  password: string;
}

const url = "http://127.0.0.1:8080/api/auth/login";

export const login = async (data: Login): Promise<Auth> => {
  return await axios.post(url, data, { withCredentials: true });
};
