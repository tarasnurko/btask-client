import axios, { AxiosError } from "axios";
import { Auth } from "@/data/auth";
import { baseUrl } from "../baseUrl";

export type SignupError = AxiosError<{ message: string }>;

export interface Signup {
  email: string;
  password: string;
}

const url = `${baseUrl}/auth/signup`;

export const signup = async (data: Signup): Promise<Auth> => {
  return await axios.post(url, data, { withCredentials: true });
};
