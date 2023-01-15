import axios from "axios";
import { CreateLeadForm } from "@/epic/forms/create-lead-form/data";
import { Lead } from "@/data/lead";
import { baseUrl } from "../";

const url = `${baseUrl}/leads`;

export const createLead = async (data: CreateLeadForm): Promise<Lead> => {
  return await axios.post(url, data, { withCredentials: true });
};
