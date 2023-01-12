import { GetServerSideProps, NextPage } from "next";

import { BaseLayout } from "@/epic/layouts/base-layout";
import {
  getFailureTasksAnalytics,
  GetFailureTasksAnalyticsRes,
} from "@/fetch/index";
import { FailureTasksAnalytics } from "@/epic/failure-tasks-analytics";
import { catchAuth } from "@/utils/server";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await catchAuth<{ analytics: GetFailureTasksAnalyticsRes }>(
    context,
    async (jwt) => {
      const analytics = await getFailureTasksAnalytics({
        jwt,
      });
      return { analytics };
    }
  );
};

interface Props {
  analytics: GetFailureTasksAnalyticsRes;
}

const Analytics: NextPage<Props> = ({ analytics }) => {
  return (
    <BaseLayout title="Analytics">
      <FailureTasksAnalytics analytics={analytics} />
    </BaseLayout>
  );
};

export default Analytics;
