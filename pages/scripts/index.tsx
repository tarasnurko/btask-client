import { GetServerSideProps, NextPage } from "next";

import { BaseLayout } from "@/epic/layouts/base-layout";

import { dehydrate, QueryClient } from "react-query";

import { getScripts } from "@/fetch/index";
import { Button, Space } from "antd";
import Link from "next/link";
import { ScriptsList } from "@/epic/scripts-list";

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

    const queryClient = new QueryClient();

    queryClient.prefetchQuery({
      queryKey: ["scripts"],
      queryFn: () => getScripts({ jwt: `${req.cookies?.jwt}` }),
    });

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch (err) {
    return {
      props: {},
    };
  }
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
