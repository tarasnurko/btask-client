import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";

import { BaseLayout } from "@/epic/layouts/base-layout";
import { CreateScriptForm } from "@/epic/forms/create-script-form";
import { catchAuth } from "@/utils/server";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await catchAuth(context);
};

const CreateScript: NextPage = () => {
  return (
    <BaseLayout title="Create Script">
      <CreateScriptForm />
    </BaseLayout>
  );
};

export default CreateScript;
