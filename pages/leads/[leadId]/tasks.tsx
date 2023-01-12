import Link from "next/link";
import { NextPage } from "next";

import { BaseLayout } from "@/epic/layouts/base-layout";

import { TasksTree } from "@/epic/tasks-tree";

const Home: NextPage = () => {
  return (
    <BaseLayout title="Lead Tasks">
      <TasksTree />
    </BaseLayout>
  );
};

export default Home;
