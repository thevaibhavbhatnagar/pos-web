"use client"
import { DataTable } from "@/ui/data-table";
import React from "react";

type Props = {
  branches: Branches[];
  page: number;
  limit: number;
  totalPages: number;
};

const Table: React.FC<Props> = ({ branches, page, limit, totalPages }) => {
  const columns = [
    {
      key: "srNo",
      label: "Sr No",
    },
    {
      key: "name",
      label: "Branch Name",
    },
    {
      key: "board",
      label: "Board",
    },
    {
      key: "company",
      label: "Company",
      renderCell: (item: Branches) => <span>{item?.company?.name}</span>
    },
    {
      key: "createdAt",
      label: "Created At",
    },
  ];

  return (
    <div className="pt-20">
      {/* <DataTable columns={columns} data={branches} pagination={{page:page,rowsPerPage:limit,totalPages:totalPages,}}/> */}
    </div>
  );
};

export default Table;