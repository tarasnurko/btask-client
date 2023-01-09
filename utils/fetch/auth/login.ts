import axios from "axios";
import { LoginForm } from "@/epic/forms/login-form/data";

const url = "http://127.0.0.1:8080/api/auth/login";

export const login = async (data: LoginForm): Promise<any> => {
  return await axios.post(url, data, { withCredentials: true });
};
