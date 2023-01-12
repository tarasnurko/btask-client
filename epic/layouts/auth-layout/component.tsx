import { Col, Layout, Row, Typography } from "antd";
import Head from "next/head";
import React from "react";

const { Title } = Typography;

interface IProps {
  children: React.ReactNode;
  title: string;
}

const Component: React.FC<IProps> = ({ children, title }) => {
  return (
    <Layout style={{ height: "100%" }}>
      <Head>
        <title>{`Btask | ${title}`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Row>
          <Col
            xs={{ offset: 3, span: 18 }}
            style={{ minWidth: "200px", paddingTop: "40px" }}
          >
            <Title>{title}</Title>
            <Layout>{children}</Layout>
          </Col>
        </Row>
      </Layout>
    </Layout>
  );
};

export default Component;
