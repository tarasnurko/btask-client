import axios from "axios";
import { Lead } from "@/data/lead";
import { useQuery } from "react-query";

// interface UseLeads {
//   jwt?: string;
// }

// const useLeads = ({ jwt }: UseLeads) => {
//   return useQuery({
//     queryKey: ["leads"],
//     queryFn: () => fetchLeads({ jwt }),
//   });
// };

// export { useLeads, fetchLeads };