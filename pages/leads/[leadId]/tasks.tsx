import { GetServerSideProps, NextPage } from "next";

import { BaseLayout } from "@/epic/layouts/base-layout";
import { TasksTree } from "@/epic/tasks-tree";
import { catchAuth } from "@/utils/server";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await catchAuth(context);
};

const Home: NextPage = () => {
  return (
    <BaseLayout title="Lead Tasks">
      <TasksTree />
    </BaseLayout>
  );
};

export default Home;
