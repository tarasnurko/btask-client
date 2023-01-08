export enum LeadSource {
  Upwork = "upwork",
  Telegram = "telegram",
  Linkedin = "linkedin",
}

export interface Lead {
  id: number;
  name: string;
  source: LeadSource;
  minBudget: number;
  maxBudget: number;
  contacts: string;
  userId: string;
}
