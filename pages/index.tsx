import Link from "next/link";
import { GetServerSideProps, NextPage } from "next";

import { Button, Space } from "antd";

import { BaseLayout } from "@/epic/layouts/base-layout";
import { LeadsTable } from "@/epic/tables/leads-table";
import { getLeads } from "@/fetch/leads/getLeads";
import { Lead } from "@/data/lead";
import { catchAuth } from "@/utils/server";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await catchAuth<{ leads: Lead[] }>(context, async (jwt) => {
    const leads = await getLeads({ jwt });
    return { leads };
  });
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
