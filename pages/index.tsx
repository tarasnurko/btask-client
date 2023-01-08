import Link from "next/link";
import { GetServerSideProps, NextPage } from "next";

import axios, { AxiosError } from "axios";

import { Button, Space } from "antd";

import { BaseLayout } from "@/epic/layouts/base-layout";
import { LeadsTable } from "@/epic/leads/leads-table";

import { fetchLeads } from "@/fetch/leads/fetchLeads";

import { Lead } from "@/data/leads";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // const leads: Lead[] = await fetchLeads({ jwt: req.cookies.jwt });

  try {
    const leads = await fetchLeads({ jwt: `${req.cookies.jwt}` });

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

  // const queryClient = new QueryClient();
  // await queryClient.prefetchQuery({
  //   queryKey: ["leads"],
  //   queryFn: fetchLeads,
  // });
  // return {
  //   props: {
  //     dehydratedState: dehydrate(queryClient),
  //   },
  // };
};

interface Props {
  leads: Lead[];
}

const Home: NextPage<Props> = ({ leads }) => {
  return (
    <BaseLayout title="Leads">
      <Space direction="vertical" style={{ width: "100%" }}>
        <Link href="/tasks/create">
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
