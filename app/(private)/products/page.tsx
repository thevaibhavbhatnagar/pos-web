import React from 'react'

import apiEndpoints from '@/utils/endpoints';
import axiosInstance from '@/utils/axiosInstance';

import ProductComponent from './_components';

import { CategoryListType } from '@/types/category/list';
import { ProductListType } from '@/types/product/list';


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

  // Call backend API to fetch products list
  const [productResponse,categoryResponse] = await Promise.all([
    axiosInstance.get(apiEndpoints.product.list, { params: { page, limit } }),
    axiosInstance.get(apiEndpoints.category.lookup)
  ])

  // Safely extract products array from API response
  // If data is missing, fallback to empty array  
  const products: ProductListType[] = productResponse?.data?.data || [];

  const categoriesList: CategoryListType[] = categoryResponse?.data?.data || [];

  const categories = categoriesList.reduce<{ label: string; value: string }[]>((acc, category) => {
    acc.push({ label: category.name, value: category.id });
    return acc;
  }, []);

  const totalPages = productResponse?.data?.meta?.totalPages;

  return (
    <ProductComponent products={products} categories={categories} statuses={statuses} page={page} totalPages={totalPages} rowsPerPage={limit} />
  )
}

