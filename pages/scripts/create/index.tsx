import { GetServerSidePropsContext, NextPage } from "next";

import { BaseLayout } from "@/epic/layouts/base-layout";
import { CreateScriptForm } from "@/epic/forms/create-script-form";

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

const CreateScript: NextPage = () => {
  return (
    <BaseLayout title="Create Script">
      <CreateScriptForm />
    </BaseLayout>
  );
};

export default CreateScript;
