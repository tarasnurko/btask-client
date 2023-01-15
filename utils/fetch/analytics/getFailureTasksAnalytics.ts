import { FailureTask } from "@/data/analytics";
import axios, { AxiosError } from "axios";
import { baseUrl } from "..";

export type GetFailureTasksAnalyticsError = AxiosError<{ message?: string }>;

export interface GetFailureTasksAnalyticsRes {
  overall: number;
  failures: FailureTask[];
}

export interface GetFailureTasksAnalytics {
  jwt: string;
}

const url = `${baseUrl}/analytics/failure`;

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
