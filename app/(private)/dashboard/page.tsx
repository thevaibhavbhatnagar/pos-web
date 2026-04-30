import axiosInstance from "@/utils/axiosInstance";
import apiEndpoints from "@/utils/endpoints";
import React from "react";
import Table from "./_components";

type Props = {
  searchParams?: Promise<{
    page?: string;
    limit?: string;
  }>;
};

const dashboard = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const page = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 10;

  const response = await axiosInstance(apiEndpoints.branch.list, {
    params: { page, limit },
  });

  const branches = response?.data?.data || [];
  const totalPages = response?.data?.meta?.totalPages || 1;

  return (
    <Table
      branches={branches}
      page={page}
      limit={limit}
      totalPages={totalPages}
    />
  );
};

export default dashboard;