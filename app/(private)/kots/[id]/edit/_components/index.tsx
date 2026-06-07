"use client";

import React, { useEffect, useMemo } from "react";
import { Chip, toast } from "@heroui/react";
import { KotDetailsType } from "@/types/kot/details";
import Table from "./table";

type Props = {
  kot: KotDetailsType;
};
import Select from '@/ui/select'
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import apiEndpoints from "@/utils/endpoints";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
const KotComponent: React.FC<Props> = ({ kot }) => {
  const router = useRouter();

  const statusOptions = useMemo(
    () => [
      {
        label: "Pending",
        value: "PENDING",
      },
      {
        label: "Preparing",
        value: "PREPARING",
      },
      {
        label: "Ready",
        value: "READY",
      },
      {
        label: "Served",
        value: "SERVED",
      },
    ],
    []
  );



  const updateStatusMutation = useMutation({
    mutationFn: async (status: string) => {
      const payload = {
        status,
      };

      const response = await axiosInstance.patch(
        `${apiEndpoints.kot.update}/${kot.id}`,
        payload
      );

      return response.data;
    },

    onSuccess: (data) => {
      toast.success(data.message || "Status updated successfully");
      router.push("/kots");
    },


    onError: (error: any) => {
      toast.danger(
        error?.response?.data?.message || "Something went wrong"
      );
    },
  });
  const formik = useFormik({
    initialValues: {
      status: kot?.status,
    },

    onSubmit: () => { },
  });

  useEffect(() => {
    if (
      formik.values.status &&
      formik.values.status !== kot.status
    ) {
      updateStatusMutation.mutate(formik.values.status);
    }
  }, [formik.values.status]);

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

        <div className="flex items-center gap-3">

          <div className="w-44">
            <Select
              label=""
              name="status"
              placeholder="Change Status"
              options={statusOptions}
              formik={formik}
            />
          </div>
        </div>
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

            {/* <div className="flex justify-between">
              <span className="text-default-500">Amount</span>
              <span className="font-semibold">
                ₹{kot?.order?.totalAmount}
              </span>
            </div> */}
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="rounded-lg bg-surface p-4">
        <h2 className="mb-4 text-sm font-semibold text-default-700">
          Order Items
        </h2>

        <Table
          data={kot?.items}
          page={1}
          totalPages={1}
          rowsPerPage={10}
        />
      </div>
    </div>
  );
};

export default KotComponent;