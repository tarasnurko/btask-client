import { FormRule } from "antd";

import { ScriptSource } from "@/data/script";

export const nameRules: FormRule[] = [
  {
    required: true,
    message: "Please provide script name",
  },
];

const scriptSource: ScriptSource[] = [
  ScriptSource.Upwork,
  ScriptSource.Telegram,
  ScriptSource.Linkedin,
];

export const sourceRules: FormRule[] = [
  {
    required: true,
    message: "Please provide script source",
  },
  {
    enum: scriptSource,
    message: "Script source can only be: upwork, telegram, linkedin",
  },
];

export const linkRules: FormRule[] = [
  {
    required: true,
    message: "Please provide script link",
  },
];
