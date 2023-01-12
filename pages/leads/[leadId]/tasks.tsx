import { GetServerSidePropsContext, NextPage } from "next";

import { BaseLayout } from "@/epic/layouts/base-layout";
import { TasksTree } from "@/epic/tasks-tree";

export const getServerSideProps = ({ req }: GetServerSidePropsContext) => {
  if (!req.cookies.jwt) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

const Home: NextPage = () => {
  return (
    <BaseLayout title="Lead Tasks">
      <TasksTree />
    </BaseLayout>
  );
};

export default Home;
