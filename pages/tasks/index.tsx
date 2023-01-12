import { GetServerSideProps, NextPage } from "next";
import { dehydrate, DehydratedState, QueryClient } from "react-query";

import { BaseLayout } from "@/epic/layouts/base-layout";
import { getNextTasks } from "@/fetch/index";
import { NextTasksTable } from "@/epic/tables/next-tasks-table";
import { catchAuth } from "@/utils/server";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await catchAuth<{ dehydratedState: DehydratedState }>(
    context,
    async (jwt) => {
      const queryClient = new QueryClient();

      queryClient.prefetchQuery({
        queryKey: ["nextTasks"],
        queryFn: () => getNextTasks({ jwt }),
      });

      return { dehydratedState: dehydrate(queryClient) };
    }
  );
};

const Tasks: NextPage = () => {
  return (
    <BaseLayout title="Tasks">
      <NextTasksTable />
    </BaseLayout>
  );
};

export default Tasks;
