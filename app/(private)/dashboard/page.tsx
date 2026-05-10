import axiosInstance from "@/utils/axiosInstance";
import apiEndpoints from "@/utils/endpoints";
import React from "react";
// import Table from "./_components";

import { Card, CardContent, CardHeader, CardTitle } from "@heroui/react";

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

  const response = await axiosInstance(apiEndpoints.dashboard.stats, {
    params: { page, limit },
  });

  const dashboardStats = response?.data?.data || [];
  

  return (
    <div className="">
      <div className="py-6 text-xl">Welcome to</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-8">
        {/* <Card>
    <CardHeader>
      <CardTitle>Today's Sales</CardTitle>
    </CardHeader>
    <CardContent>
      <h2 className="text-3xl font-bold">₹12,450</h2>
    </CardContent>
  </Card> */}

        <Card>
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-3xl font-bold">{dashboardStats.totalOrders}</h2>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending KOT</CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-3xl font-bold">{dashboardStats.pendingKots}</h2>
          </CardContent>
        </Card>

        {/* <Card>
    <CardHeader>
      <CardTitle>Active Tables</CardTitle>
    </CardHeader>
    <CardContent>
      <h2 className="text-3xl font-bold">12</h2>
    </CardContent>
  </Card> */}
      </div>
    </div>

  );
};

export default dashboard;