import { GetServerSideProps } from "next";

import { BaseLayout } from "@/epic/layouts/base-layout";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return { props: { data: "asd" } };
};

interface IProps {}

export default function Home(props) {
  console.log(props);
  return (
    <BaseLayout title="Btask | Leads">
      <div style={{ width: "300px", background: "red" }}></div>
    </BaseLayout>
  );
}
