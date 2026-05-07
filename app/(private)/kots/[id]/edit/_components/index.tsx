"use client";

import React from "react";
import { Chip } from "@heroui/react";
import { KotDetailsType } from "@/types/kot/details";
import Table from "./table";

type Props = {
  kot: KotDetailsType;
};

const KotComponent: React.FC<Props> = ({ kot }) => {
  return (
    <div className="space-y-4  py-8 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">KOT Details</h1>
          <p className="text-sm text-default-500">
            KOT No : {kot?.kotNo}
          </p>
        </div>

        <Chip
          size="sm" 
        >
          {kot?.status}
        </Chip>
      </div>

      {/* Info Cards */}
      <div className="grid gap-4 md:grid-cols-2 ">
        {/* KOT Info */}
        <div className="rounded-lg border border-default-200 p-4 bg-surface">
          <h2 className="mb-3 text-sm font-semibold text-default-700">
            KOT Information
          </h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-default-500">KOT No</span>
              <span className="font-medium">{kot?.kotNo}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-default-500">Created</span>
              <span className="font-medium">
                {new Date(kot?.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Order Info */}
        <div className="rounded-lg border border-default-200 p-4 bg-surface">
          <h2 className="mb-3 text-sm font-semibold text-default-700">
            Order Information
          </h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-default-500">Bill No</span>
              <span className="font-medium">
                {kot?.order?.billNo}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-default-500">Branch</span>
              <span className="font-medium">
                {kot?.order?.branch?.name}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-default-500">Amount</span>
              <span className="font-semibold">
                ₹{kot?.order?.totalAmount}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="rounded-lg bg-surface p-4">
        <h2 className="mb-4 text-sm font-semibold text-default-700">
          Order Items
        </h2>

        <Table
          data={kot?.order?.items}
          page={1}
          totalPages={1}
          rowsPerPage={10}
        />
      </div>
    </div>
  );
};

export default KotComponent;