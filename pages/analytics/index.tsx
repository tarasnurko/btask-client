import Link from "next/link";
import { GetServerSideProps, NextPage } from "next";

import axios, { AxiosError } from "axios";

import { Button, Space } from "antd";

import { BaseLayout } from "@/epic/layouts/base-layout";
import { LeadsTable } from "@/epic/tables/leads-table";

import { getLeads } from "@/fetch/leads/getLeads";

import { Lead } from "@/data/lead";
import {
  getFailureTasksAnalytics,
  GetFailureTasksAnalyticsRes,
} from "@/fetch/index";
import { FailureTasksAnalytics } from "@/epic/failure-tasks-analytics";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const analytics = await getFailureTasksAnalytics({
      jwt: `${req.cookies.jwt}`,
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
