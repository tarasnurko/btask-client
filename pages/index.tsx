import Link from "next/link";
import { GetServerSideProps, NextPage } from "next";

import { AxiosError } from "axios";
import { Button, Space } from "antd";

import { BaseLayout } from "@/epic/layouts/base-layout";
import { LeadsTable } from "@/epic/tables/leads-table";
import { getLeads } from "@/fetch/leads/getLeads";
import { Lead } from "@/data/lead";

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

    const leads = await getLeads({ jwt: req.cookies.jwt });

    return {
      props: {
        leads: leads,
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
  leads: Lead[];
}

const Home: NextPage<Props> = ({ leads }) => {
  return (
    <BaseLayout title="Leads">
      <Space direction="vertical" style={{ width: "100%" }}>
        <Link href="/leads/create">
          <Button type="primary" block ghost>
            Add Lead
          </Button>
        </Link>
        <LeadsTable leads={leads} />
      </Space>
    </BaseLayout>
  );
};

export default Home;
