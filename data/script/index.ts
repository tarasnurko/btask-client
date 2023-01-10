export enum ScriptSource {
  Upwork = "upwork",
  Telegram = "telegram",
  Linkedin = "linkedin",
}

export interface Script {
  id: number;
  name: string;
  source: ScriptSource;
  link: string;
  userId: number;
}
