import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { Button, Popconfirm, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

import { deleteLead } from "@/fetch/index";

import { Lead } from "@/data/leads";

interface Props {
  leads: Lead[];
}

const Component: React.FC<Props> = ({ leads }) => {
  const router = useRouter();

  const handleDelete = async (leadId: number) => {
    try {
      await deleteLead(leadId);
      router.reload();
    } catch (err) {}
  };

  const columns: ColumnsType<Lead> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: string, lead: Lead) => (
        <Link href={`/leads/${lead.id}/tasks`}>{name}</Link>
      ),
    },
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
    },
    {
      title: "Budget",
      dataIndex: "budget",
      key: "budget",
      render: (_, lead: Lead) => {
        if (lead.minBudget === 0 && lead.maxBudget !== 100000) {
          return <span>up to {(lead.maxBudget / 1000).toFixed(1)}k</span>;
        }
        if (lead.maxBudget !== 0 && lead.maxBudget === 100000) {
          return <span>{(lead.minBudget / 1000).toFixed(1)}+k</span>;
        }

        return (
          <span>
            {(lead.minBudget / 1000).toFixed(1)}-
            {(lead.maxBudget / 1000).toFixed(1)}k
          </span>
        );
      },
    },
    {
      title: "Contacts",
      dataIndex: "contacts",
      key: "contects",
    },
    {
      title: "Delete",
      key: "delete",
      render: (_, lead: Lead) => (
        <Popconfirm
          title="Delete the lead"
          description="Are you sure to delete this lead?"
          okText="Delete"
          cancelText="Cancel"
          okButtonProps={{ danger: true }}
          onConfirm={() => handleDelete(lead.id)}
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={leads}
      rowKey="id"
      scroll={{ x: true }}
    />
  );
  // return <div>df</div>;
};

export default Component;
