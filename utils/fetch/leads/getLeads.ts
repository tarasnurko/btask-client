import { Lead } from "@/data/lead";
import axios from "axios";

interface GetLeads {
  jwt: string;
}

const url = "http://127.0.0.1:8080/api/leads";

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
