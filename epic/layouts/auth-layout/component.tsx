import { Layout } from "antd";
import Head from "next/head";
import React from "react";

const { Content } = Layout;

interface IProps {
  children: React.ReactNode;
  title: string;
}

const Component: React.FC<IProps> = ({ children, title }) => {
  return (
    <Layout style={{ height: "100%" }}>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Content>{children}</Content>
    </Layout>
  );
};

export default Component;
