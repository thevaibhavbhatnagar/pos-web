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
    console.log(response?.data?.data)
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
        <div className="flex flex-col gap-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

            <Card>
              <CardHeader>
                <CardTitle>Top Category</CardTitle>
              </CardHeader>

              <CardContent>
                {dashboardStats.topCategory ? (
                  <div>
                    <h2 className="text-2xl font-bold text-primary">
                      {dashboardStats.topCategory.categoryName}
                    </h2>
                    <p className="text-xs text-default-500 mt-1">
                      {dashboardStats.topCategory.quantitySold} Items Sold
                    </p>
                  </div>
                ) : (
                  <h2 className="text-xl text-default-400">No Sales Today</h2>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Category Sales Breakdown */}
          {dashboardStats.categorySales && dashboardStats.categorySales.length > 0 && (
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Category Sales Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {dashboardStats.categorySales.map((sale: any) => {
                  const maxSold = dashboardStats.topCategory?.quantitySold || 1;
                  const percentage = Math.round((sale.quantitySold / maxSold) * 100);
                  return (
                    <div key={sale.categoryId} className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-center text-sm font-medium">
                        <span className="text-default-700">{sale.categoryName}</span>
                        <span className="text-default-500 font-semibold">{sale.quantitySold} sold</span>
                      </div>
                      <div className="w-full bg-default-100 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;