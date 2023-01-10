import { GetServerSideProps, NextPage } from "next";

import { BaseLayout } from "@/epic/layouts/base-layout";

import { dehydrate, QueryClient } from "react-query";

import { getNextTasks } from "@/fetch/index";
import { NextTasksTable } from "@/epic/tables/next-tasks-table";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const queryClient = new QueryClient();

    queryClient.prefetchQuery({
      queryKey: ["tasks"],
      queryFn: () => getNextTasks({ jwt: `${req.cookies?.jwt}` }),
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

const Tasks: NextPage = () => {
  return (
    <BaseLayout title="Tasks">
      <NextTasksTable />
    </BaseLayout>
  );
};

export default Tasks;
