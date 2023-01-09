import axios from "axios";

const url = "http://127.0.0.1:8080/api/leads";

export const deleteLead = async (leadId: number): Promise<void> => {
  return axios.delete(`${url}/${leadId}`, {
    withCredentials: true,
  });
};
