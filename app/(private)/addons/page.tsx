import React from 'react'

import apiEndpoints from '@/utils/endpoints';
import axiosInstance from '@/utils/axiosInstance';

import AddonComponent from './_components';
import { AddonListType } from '@/types/addon/list';

export const dynamic = "force-dynamic";

const statuses = [
  { label: "Active", value: "true" },
  { label: "Inactive", value: "false" }
]

export default async function Page({ searchParams }: { searchParams: Promise<{ page?: string; search?: string; sort_by?: string; sort_dir?: string }> }) {
  const params = await searchParams;

  const page = Number(params.page || 1);
  const limit = 10;

  // Fetch addons
  const response = await axiosInstance.get(apiEndpoints.addon.list, { params: { page, limit } });

  const addons: AddonListType[] = response?.data?.data || [];
  const totalPages = response?.data?.meta?.totalPages;
  const totalItems = response?.data?.meta?.total;

  return (
    <AddonComponent addons={addons} statuses={statuses} page={page} totalPages={totalPages} rowsPerPage={limit} totalItems={totalItems} />
  )
}
