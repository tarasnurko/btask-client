import { GetServerSidePropsContext, NextPage } from "next";

import { BaseLayout } from "@/epic/layouts/base-layout";
import { CreateLeadForm } from "@/epic/forms/create-lead-form";

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

const CreateLead: NextPage = () => {
  return (
    <BaseLayout title="Create Lead">
      <CreateLeadForm />
    </BaseLayout>
  );
};

export default CreateLead;
