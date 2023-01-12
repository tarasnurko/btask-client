import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { dehydrate, DehydratedState, QueryClient } from "react-query";

import { Button, Space } from "antd";

import { BaseLayout } from "@/epic/layouts/base-layout";
import { ScriptsList } from "@/epic/scripts-list";
import { catchAuth } from "@/utils/server";
import { getScripts } from "@/fetch/index";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await catchAuth<{ dehydratedState: DehydratedState }>(
    context,
    async (jwt) => {
      const queryClient = new QueryClient();

      queryClient.prefetchQuery({
        queryKey: ["scripts"],
        queryFn: () => getScripts({ jwt }),
      });

      return { dehydratedState: dehydrate(queryClient) };
    }
  );
};

const Scripts: NextPage = () => {
  return (
    <BaseLayout title="Scripts">
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Link href="/scripts/create">
          <Button type="primary" block ghost>
            Add Script
          </Button>
        </Link>
        <ScriptsList />
      </Space>
    </BaseLayout>
  );
};

export default Scripts;
