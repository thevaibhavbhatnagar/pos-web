import React from "react";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import apiEndpoints from "@/utils/endpoints";
import axiosInstance from "@/utils/axiosInstance";
import ReportsComponent from "./_components";
import { ProductSalesReportItem } from "@/types/reports";

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ branchId?: string; period?: string,page?:string }>;
}) { 
  const params = await searchParams;
  const limit = 10;
  const page = Number(params.page || 1);
  const period = params.period || "daily";

  const session = await getServerSession(authOptions);
  const currentUser = session?.user; 

  // Resolve branchId: branch restriction if present, or parameter, or fallback to first branch
  const branchId = currentUser?.branchId || "";

  let response;
  let salesData : ProductSalesReportItem[] = [];
  let serverError = "";

  if (branchId) {
    response= await axiosInstance.get(apiEndpoints.reports.productSales(branchId), { params: { period } });
    salesData = response?.data?.data || [];
    salesData =
  response?.data?.data?.map((item: any) => ({
    ...item,
    id: item.productId,
  })) || [];
    
  }
   const totalPages = response?.data?.meta?.totalPages;

  const totalItems = response?.data?.meta?.total;

  return (
    <ReportsComponent
      data={salesData} 
      period={period}
      serverError={serverError}
      page={page}
      totalPages={totalPages}
      rowsPerPage={limit}
      totalItems={totalItems}
    />
  );
}
