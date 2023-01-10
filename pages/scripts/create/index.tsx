import { NextPage } from "next";

import { BaseLayout } from "@/epic/layouts/base-layout";
import { CreateScriptForm } from "@/epic/forms/create-script-form";

const CreateScript: NextPage = () => {
  return (
    <BaseLayout title="Create Script">
      <CreateScriptForm />
    </BaseLayout>
  );
};

export default CreateScript;
