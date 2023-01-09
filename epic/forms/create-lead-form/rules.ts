import { LeadSource } from "@/data/lead";
import { FormRule } from "antd";

export const nameRules: FormRule[] = [
  {
    required: true,
    message: "Please provide lead name",
  },
];

const leadSource: LeadSource[] = [
  LeadSource.Upwork,
  LeadSource.Telegram,
  LeadSource.Linkedin,
];

export const sourceRules: FormRule[] = [
  {
    required: true,
    message: "Please provide source",
  },
  {
    enum: leadSource,
    message: "Source can only be: upwork, telegram, linkedin",
  },
];

export const nextTaskRules: FormRule[] = [
  {
    required: true,
    message: "Please provide next task",
  },
];

export const contactsRules: FormRule[] = [
  {
    required: true,
    message: "Provide lead contacts",
  },
];
