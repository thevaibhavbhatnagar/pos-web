import React from 'react'

import apiEndpoints from '@/utils/endpoints';
import axiosInstance from '@/utils/axiosInstance';
import { OrderListType } from '@/types/order/list';
import OrderComponent from './_components';

// Force dynamic rendering (disables Next.js static optimization)
export const dynamic = "force-dynamic";

export default async function Page({ searchParams }: { searchParams: Promise<{ page?: string; search?: string; sort_by?: string; sort_dir?: string }> }) {

  // Await the searchParams before using
  const params = await searchParams;

  const page = Number(params.page || 1);
  const limit = 10;

  // Call backend API to fetch user list
  const response = await axiosInstance.get(apiEndpoints.order.lookup, { params: { page: page, limit: limit } })

  const orders: OrderListType[] = response?.data?.data || [];

  const totalPages = response?.data?.meta?.totalPages;

  const totalItems = response?.data?.meta?.total;

  console.log(orders)

  return (
    <OrderComponent orders={orders} page={page} totalPages={totalPages} rowsPerPage={limit} totalItems={totalItems} />
  )
}

