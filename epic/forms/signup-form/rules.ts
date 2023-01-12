import { FormRule } from "antd";

export const emailRules: FormRule[] = [
  {
    type: "email",
    message: "Please provide valid email!",
  },
  {
    required: true,
    message: "Please provide your email!",
  },
];

export const passwordRules: FormRule[] = [
  {
    min: 8,
    message: "Password must have at least 8 characters",
  },
  {
    required: true,
    message: "Please provide your password",
  },
];
