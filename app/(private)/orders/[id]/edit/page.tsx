import React from 'react'

import apiEndpoints from '@/utils/endpoints';
import axiosInstance from '@/utils/axiosInstance';
import OrderComponent from './_components';
import { OrderDetailsType } from '@/types/order/details';
import { ProductListType } from '@/types/product/list';
import { CategoryListType } from '@/types/category/list';


// Force dynamic rendering (disables Next.js static optimization)
export const dynamic = "force-dynamic";


type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    page?: string;
    search?: string;
    sort_by?: string;
    sort_dir?: string;
    category_id?: string;
  }>;
};

export default async function Page({ params, searchParams }: Props) {

  // Await the searchParams before using
  const resolvedParams = await searchParams;
  const { id } = await params;
  const page = Number(resolvedParams.page || 1);
  const limit = 10;

  // Call backend API to fetch products list
  const [orderResponse, productResponse, categoryResponse] = await Promise.all([
    axiosInstance.get(apiEndpoints.order.details(id)),
    axiosInstance.get(apiEndpoints.product.getProductsByCategory(resolvedParams.category_id || ""), { params: { page, limit } }),
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

  const order: OrderDetailsType = orderResponse?.data?.data || {};

  console.log("order________________", order)

  return (
    <OrderComponent order={order} products={products} categories={categories} />
  )
}

