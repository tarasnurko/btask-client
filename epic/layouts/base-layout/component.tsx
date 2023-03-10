import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { Col, Layout, Menu, MenuProps, Row, Typography } from "antd";

import {
  ContactsOutlined,
  ScheduleOutlined,
  CodeOutlined,
  PercentageOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useMutation } from "react-query";
import { logout } from "@/fetch/index";

const { Sider } = Layout;
const { Title } = Typography;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

interface IProps {
  children: React.ReactNode;
  title: string;
}

const Component: React.FC<IProps> = ({ children, title }) => {
  const router = useRouter();

  const { mutate } = useMutation(logout);

  const handleLogout = () => {
    mutate();
    router.push("/auth/login");
  };

  const getSelectedKeys = () => {
    if (router.pathname === "/") return ["1"];
    if (router.pathname === "/tasks") return ["2"];
    if (router.pathname === "/scripts") return ["3"];
    if (router.pathname === "/analytics") return ["4"];
  };

  const items: MenuProps["items"] = [
    getItem(<Link href="/">Leads</Link>, "1", <ContactsOutlined />),
    getItem(<Link href="/tasks">Tasks</Link>, "2", <ScheduleOutlined />),
    getItem(<Link href="/scripts">Scripts</Link>, "3", <CodeOutlined />),
    getItem(
      <Link href="/analytics">Analytics</Link>,
      "4",
      <PercentageOutlined />
    ),
    getItem(
      <span onClick={handleLogout}>Logout</span>,
      "5",
      <LogoutOutlined />
    ),
  ];

  return (
    <Layout style={{ minHeight: "100%" }}>
      <Head>
        <title>{`Btask | ${title}`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sider breakpoint="lg" collapsedWidth="0" style={{ paddingTop: "20px" }}>
        <Menu
          theme="dark"
          mode="inline"
          items={items}
          selectedKeys={getSelectedKeys()}
        />
      </Sider>
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
