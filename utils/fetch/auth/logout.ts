import axios from "axios";
import { baseUrl } from "../";

const url = `${baseUrl}/auth/logout`;

export const logout = async (): Promise<void> => {
  return await axios.post(url, null, {
    withCredentials: true,
  });
};
