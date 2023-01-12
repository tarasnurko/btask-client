import { GetServerSideProps, NextPage } from "next";

import { BaseLayout } from "@/epic/layouts/base-layout";
import { CreateLeadForm } from "@/epic/forms/create-lead-form";
import { catchAuth } from "@/utils/server";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await catchAuth(context);
};

const CreateLead: NextPage = () => {
  return (
    <BaseLayout title="Create Lead">
      <CreateLeadForm />
    </BaseLayout>
  );
};

export default CreateLead;
