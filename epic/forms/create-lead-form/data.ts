import { LeadSource } from "@/data/lead";
import { AxiosError } from "axios";

export interface CreateLeadForm {
  name: string;
  source: LeadSource;
  minBudget?: number;
  maxBudget?: number;
  nextTask: 1 | 2 | 3 | 4 | 5;
  contacts: string;
}

export type CreateLeadError = AxiosError<{ message: string }>;
