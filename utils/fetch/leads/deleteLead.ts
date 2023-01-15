import axios from "axios";
import { baseUrl } from "../baseUrl";

const url = `${baseUrl}/leads`;

export const deleteLead = async (leadId: number): Promise<void> => {
  return axios.delete(`${url}/${leadId}`, {
    withCredentials: true,
  });
};
