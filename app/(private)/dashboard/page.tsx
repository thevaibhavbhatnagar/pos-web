// import axiosInstance from "@/utils/axiosInstance";
// import apiEndpoints from "@/utils/endpoints";
// import React from "react";
// import Table from "./_components";

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

  // const response = await axiosInstance(apiEndpoints.branch.lookup, {
  //   params: { page, limit },
  // });

  // const branches = response?.data?.data || [];
  // const totalPages = response?.data?.meta?.totalPages || 1;

  return (
    <div className="py-6 text-xl">Welcome to dashboard</div>
    // <Table
    //   branches={branches}
    //   page={page}
    //   limit={limit}
    //   totalPages={totalPages}
    // />
  );
};

export default dashboard;