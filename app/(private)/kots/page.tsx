import React from 'react'

import apiEndpoints from '@/utils/endpoints';
import axiosInstance from '@/utils/axiosInstance';

import KotComponent from './_components';

import { CategoryListType } from '@/types/category/list';
import { ProductListType } from '@/types/product/list';
import { KotListType } from '@/types/kot/list';


// Force dynamic rendering (disables Next.js static optimization)
export const dynamic = "force-dynamic";

const statuses = [
  { label: "Active", value: "true" },
  { label: "Inactive", value: "false" }

]

export default async function Page({ searchParams }: { searchParams: Promise<{ page?: string; search?: string; sort_by?: string; sort_dir?: string; category_id?: string }> }) {

  // Await the searchParams before using
  const params = await searchParams;

  const page = Number(params.page || 1);
  const limit = 10;

  // Call backend API to fetch products list
  const response = await  axiosInstance.get(apiEndpoints.kot.list);

  const kots: KotListType[] = response?.data?.data || [];
  
  const totalPages = response?.data?.meta?.totalPages;

  return (
    <KotComponent kots={kots} page={page} totalPages={totalPages} rowsPerPage={limit} />
  )
}
