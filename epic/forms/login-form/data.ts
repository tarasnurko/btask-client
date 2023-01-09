import { AxiosError } from "axios";

export interface LoginForm {
  email: string;
  password: string;
}

export type LoginError = AxiosError<{ message: string }>;
