import React from 'react'

import apiEndpoints from '@/utils/endpoints';
import axiosInstance from '@/utils/axiosInstance';

import CategoryComponent from './_components';

import { CategoryListType } from '@/types/category/list';


// Force dynamic rendering (disables Next.js static optimization)
export const dynamic = "force-dynamic";

const statuses = [
  { label: "Active", value: "true" },
  { label: "Inactive", value: "false" }

]

export default async function Page({ searchParams }: { searchParams: Promise<{ page?: string; search?: string; sort_by?: string; sort_dir?: string }> }) {

  // Await the searchParams before using
  const params = await searchParams;

  const page = Number(params.page || 1);
  const limit = 10;

  // Call backend API to fetch user list
  const response = await axiosInstance.get(apiEndpoints.category.list, { params: { page, limit } })

  // Safely extract users array from API response
  // If data is missing, fallback to empty array
  const categories: CategoryListType[] = response?.data?.data || [];

  const totalPages = response?.data?.meta?.totalPages;
 
  const totalItems = response?.data?.meta?.total;

  return (
    <CategoryComponent categories={categories} statuses={statuses} page={page} totalPages={totalPages} rowsPerPage={limit} totalItems={totalItems} />
  )
}

