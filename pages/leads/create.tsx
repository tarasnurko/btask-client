import { NextPage } from "next";
import { BaseLayout } from "@/epic/layouts/base-layout";
import { CreateLeadForm } from "@/epic/forms/create-lead-form";

const CreateLead: NextPage = () => {
  return (
    <BaseLayout title="Create Lead">
      <CreateLeadForm />
    </BaseLayout>
  );
};

export default CreateLead;
