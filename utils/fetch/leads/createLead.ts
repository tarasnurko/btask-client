import axios from "axios";
import { CreateLeadForm } from "@/epic/forms/create-lead-form/data";
import { Lead } from "@/data/lead";

const url = "http://127.0.0.1:8080/api/leads";

export const createLead = async (data: CreateLeadForm): Promise<Lead> => {
  return await axios.post(url, data, { withCredentials: true });
};
