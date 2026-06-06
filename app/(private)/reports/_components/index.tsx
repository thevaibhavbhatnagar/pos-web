"use client";

import React, { useState, useMemo } from "react";
import {
  BarChart3,
  TrendingUp,
  Layers,
  Award,
  ListChevronsUpDown,
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { ProductSalesReportItem } from "@/types/reports";
import { DataTable, Column } from "@/ui/data-table";
import NoImage from "@/public/assets/no-image.webp";

interface Props { 
  data: ProductSalesReportItem[];
  period: string;
  serverError?: string;
  page: number;
    totalPages: number;
    rowsPerPage: number;
    totalItems?: number;
}

const periods = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" }
];

export default function ReportsComponent({  
  data = [],
  period,
  serverError,
  page,
  totalPages,
  rowsPerPage,
  totalItems,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();


  const handlePeriodChange = (periodVal: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("period", periodVal);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // KPI Calculations
  const totalRevenue = useMemo(() => {
    return data.reduce((acc, item) => acc + Number(item.totalSales || 0), 0);
  }, [data]);

  const totalItemsSold = useMemo(() => {
    return data.reduce((acc, item) => acc + Number(item.quantitySold || 0), 0);
  }, [data]);

 

  // Table Columns config
  const columns: Column<ProductSalesReportItem>[] = [
    {
      key: "srNo",
      label: "Sr. No.",
      renderCell: (_, rowIndex) => (rowIndex ?? 0) + 1,
    },
    {
      key: "image",
      label: "Image",
      renderCell: (item) => (
        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-default-100 flex items-center justify-center">
          <Image
            src={item.image || NoImage}
            alt={item.productName || "Product"}
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>
      ),
    },
    {
      key: "productName",
      label: "Product Name",
      renderCell: (item) => (
        <span className="font-semibold text-foreground">{item.productName || "N/A"}</span>
      ),
    },
    {
      key: "category",
      label: "Category",
      renderCell: (item) => (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-chip-pending text-chip-pending-text dark:bg-chip-pending dark:text-chip-pending-text">
          {item.category || "N/A"}
        </span>
      ),
    },
    {
      key: "price",
      label: "Unit Price",
      renderCell: (item) => <span>₹{Number(item.price || 0).toFixed(2)}</span>,
    },
    {
      key: "quantitySold",
      label: "Quantity Sold",
      renderCell: (item) => (
        <span className="font-medium text-foreground">{item.quantitySold}</span>
      ),
    },
    {
      key: "totalSales",
      label: "Total Sales",
      renderCell: (item) => (
        <span className="font-bold text-chip-active-text">
          ₹{Number(item.totalSales || 0).toFixed(2)}
        </span>
      ),
    },
  ];

  return (
    <div className="py-6 space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <BarChart3 className="text-primary size-7" /> Sales & Analytics Report
        </h1>

        {/* Dynamic selectors for Branch / Period */}
        <div className="flex flex-wrap items-center gap-3">


          {/* Period selector */}
          <div className="bg-default-100 p-1 rounded-xl border border-divider flex gap-1">
            {periods.map((p) => (
              <button
                key={p.value}
                onClick={() => handlePeriodChange(p.value)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${period === p.value
                    ? "bg-white text-black shadow-sm font-bold dark:bg-zinc-800 dark:text-white"
                    : "text-default-500 hover:text-default-900"
                  }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ERROR MESSAGE BAR */}
      {serverError && (
        <div className="p-4 bg-danger/10 border border-danger/20 rounded-2xl text-sm text-danger font-medium flex items-center gap-2">
          <span>⚠️</span> {serverError}
        </div>
      )}

      {/* KPI METRICS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Revenue */}
        <div className="bg-surface border border-divider rounded-2xl p-5 shadow-sm flex items-center justify-between hover:-translate-y-1 hover:shadow-md transition-all duration-200">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-default-500">
              Total Revenue
            </span>
            <h3 className="text-2xl font-bold text-foreground">
              ₹{totalRevenue.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h3>
          </div>
          <div className="p-3 bg-primary/10 rounded-xl text-primary">
            <TrendingUp size={24} />
          </div>
        </div>

        {/* Total Items Sold */}
        <div className="bg-surface border border-divider rounded-2xl p-5 shadow-sm flex items-center justify-between hover:-translate-y-1 hover:shadow-md transition-all duration-200">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-default-500">
              Items Sold
            </span>
            <h3 className="text-2xl font-bold text-foreground">{totalItemsSold}</h3>
          </div>
          <div className="p-3 bg-success-foreground/10 rounded-xl text-success-foreground">
            <Layers size={24} />
          </div>
        </div>
      </div>

      {/* PRODUCT SALES BREAKDOWN TABLE */}
      <div className="py-3 rounded-lg w-full h-full flex flex-col gap-4 bg-surface border border-divider shadow-sm">
        <div className="flex flex-col md:flex-row gap-3 md:gap-0 justify-between px-4 mb-2 items-center">
          <div className="flex gap-2 items-center">
            <div className="rounded-lg bg-primary/10 text-primary flex items-center justify-center aspect-square w-6 h-6 ">
              <ListChevronsUpDown width={18} />
            </div>
            <h2 className="text-base font-medium">Product Sales Breakdown</h2>
          </div>
        </div>
        <div className="w-full overflow-x-auto px-1">
          <DataTable columns={columns} data={data} pagination={{ page: page, totalPages: totalPages, rowsPerPage: rowsPerPage,totalItems:totalItems }} wrapperClassName="max-h-[400px]" />
                      
        </div>
      </div>
    </div>
  );
}
