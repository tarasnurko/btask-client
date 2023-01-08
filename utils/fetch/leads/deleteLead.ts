import axios from "axios";

export const deleteLead = async (leadId: number): Promise<void> => {
  return axios.delete(`http://127.0.0.1:8080/api/leads/${leadId}`, {
    withCredentials: true,
  });
};
