import axios, { AxiosError } from "axios";
import { Auth } from "@/data/auth";

export type SignupError = AxiosError<{ message: string }>;

export interface Signup {
  email: string;
  password: string;
}

const url = "http://127.0.0.1:8080/api/auth/signup";

export const signup = async (data: Signup): Promise<Auth> => {
  return await axios.post(url, data, { withCredentials: true });
};
