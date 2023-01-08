import { Lead } from "@/data/leads";
import axios from "axios";

interface FetchLeads {
  jwt: string;
}

export const fetchLeads = async ({ jwt }: FetchLeads): Promise<Lead[]> => {
  const data: Lead[] = await axios
    .get("http://127.0.0.1:8080/api/leads", {
      withCredentials: true,
      headers: {
        Cookie: `jwt=${jwt}`,
      },
    })
    .then((res) => res.data);

  return data;
};
