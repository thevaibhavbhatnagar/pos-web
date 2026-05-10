import React from 'react'

import apiEndpoints from '@/utils/endpoints';
import axiosInstance from '@/utils/axiosInstance';

import BranchesComponent from "./_components";

import { BranchListType } from '@/types/branch/list';


const boardTypes: { label: string; value: string }[] = [
  { label: "CBSE", value: "CBSE" },
  { label: "RBSE", value: "RBSE" },
];


// Force dynamic rendering (disables Next.js static optimization)
export const dynamic = "force-dynamic";

export default async function Page({ searchParams }: { searchParams: Promise<{ page?: string; search?: string; sort_by?: string; sort_dir?: string }> }) {

  // Await the searchParams before using
  const params = await searchParams;

  const page = Number(params.page || 1);
  const limit = 10;

  // Call backend API to fetch branch and company list
  const response = await axiosInstance.get(apiEndpoints.branch.list,{params:{page, limit}});


  // Safely extract users array from API response
  // If data is missing, fallback to empty array
  const branches: BranchListType[] = response?.data?.data || [];

  const totalPages = response?.data?.meta?.totalPages;

  const totalItems = response?.data?.meta?.total;

  return (
    <BranchesComponent branches={branches} page={page} totalPages={totalPages} rowsPerPage={limit} totalItems={totalItems} />
  )
}

