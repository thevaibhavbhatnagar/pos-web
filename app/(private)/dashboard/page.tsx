import axiosInstance from "@/utils/axiosInstance";
import apiEndpoints from "@/utils/endpoints";
import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@heroui/react";

type Props = {
  searchParams?: Promise<{
    page?: string;
    limit?: string;
  }>;
};

const Dashboard = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const page = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 10;

  let dashboardStats: any = {};
  let dashboardType = "";
  let message = "";
  let role = "";

  try {
    const response = await axiosInstance(apiEndpoints.dashboard.stats, {
      params: { page, limit },
    });

    dashboardStats = response?.data?.data || {};

    dashboardType = dashboardStats?.dashboardType || "";
    role = dashboardStats?.role || "";
    message = response?.data?.message || "";
  } catch (error) {
    console.error("Dashboard API Error:", error);

    return (
      <div className="py-10 text-center text-red-500">
        Failed to load dashboard data
      </div>
    );
  }

  return (
    <div>
      <div className="py-6">
        <h1 className="text-2xl font-semibold">
          {message || "Welcome"}
        </h1>

        <p className="text-sm text-gray-500">
          Logged in as: {role}
        </p>
      </div>

      {/* CENTRAL DASHBOARD */}
      {dashboardType === "CENTRAL" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Branches</CardTitle>
            </CardHeader>

            <CardContent>
              <h2 className="text-3xl font-bold">
                {dashboardStats.totalBranches}
              </h2>
            </CardContent>
          </Card>
        </div>
      )}

      {/* BRANCH DASHBOARD */}
      {dashboardType === "BRANCH" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Orders</CardTitle>
            </CardHeader>

            <CardContent>
              <h2 className="text-3xl font-bold">
                {dashboardStats.totalOrders}
              </h2>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pending KOT</CardTitle>
            </CardHeader>

            <CardContent>
              <h2 className="text-3xl font-bold">
                {dashboardStats.pendingKots}
              </h2>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Dashboard;