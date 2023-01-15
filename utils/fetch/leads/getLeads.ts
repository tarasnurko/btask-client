import { Lead } from "@/data/lead";
import axios, { AxiosError } from "axios";
import { baseUrl } from "../";

export type GetNextTasksError = AxiosError<{ message?: string }>;
interface GetLeads {
  jwt: string;
}

const url = `${baseUrl}/leads`;

export const getLeads = async ({ jwt }: GetLeads): Promise<Lead[]> => {
  const data: Lead[] = await axios
    .get(url, {
      withCredentials: true,
      headers: {
        Cookie: `jwt=${jwt}`,
      },
    })
    .then((res) => res.data);

  return data;
};
