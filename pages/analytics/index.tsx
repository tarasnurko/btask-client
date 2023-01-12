import { GetServerSideProps, NextPage } from "next";

import { AxiosError } from "axios";

import { BaseLayout } from "@/epic/layouts/base-layout";
import {
  getFailureTasksAnalytics,
  GetFailureTasksAnalyticsRes,
} from "@/fetch/index";
import { FailureTasksAnalytics } from "@/epic/failure-tasks-analytics";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    if (!req.cookies.jwt) {
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    }

    const analytics = await getFailureTasksAnalytics({
      jwt: req.cookies.jwt,
    });

    return {
      props: {
        analytics,
      },
    };
  } catch (err: unknown) {
    if (
      err instanceof AxiosError &&
      err.response &&
      err.response.data.statusCode === 401
    ) {
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    }

    return {
      notFound: true,
    };
  }
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
