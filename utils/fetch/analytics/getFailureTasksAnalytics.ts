import { FailureTask } from "@/data/analytics";
import { Lead } from "@/data/lead";
import axios, { AxiosError } from "axios";

export type GetFailureTasksAnalyticsError = AxiosError<{ message?: string }>;

export interface GetFailureTasksAnalyticsRes {
  overall: number;
  failures: FailureTask[];
}

export interface GetFailureTasksAnalytics {
  jwt: string;
}

const url = "http://127.0.0.1:8080/api/analytics/failure";

export const getFailureTasksAnalytics = async ({
  jwt,
}: GetFailureTasksAnalytics): Promise<GetFailureTasksAnalyticsRes> => {
  const data: GetFailureTasksAnalyticsRes = await axios
    .get(url, {
      withCredentials: true,
      headers: {
        Cookie: `jwt=${jwt}`,
      },
    })
    .then((res) => res.data);

  return data;
};
