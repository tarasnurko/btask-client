import { AxiosError } from "axios";

export const loginUrl = "http://127.0.0.1:8080/api/auth/login";

export interface IForm {
  email: string;
  password: string;
}

export type IError = AxiosError<{ message: string }>;
