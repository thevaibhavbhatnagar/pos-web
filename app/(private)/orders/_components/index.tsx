"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

import Table from './table'

import useRoleForm from '@/hooks/use-role-form'
import { OrderListType } from '@/types/order/list'

type Props = {
  orders: OrderListType[];
  page: number;
  totalPages: number;
  rowsPerPage: number;

}

const OrderComponent: React.FC<Props> = ({ orders, page, totalPages, rowsPerPage }) => {

  const router = useRouter();

  const { useRoleFormik } = useRoleForm({
    onSuccess: () => { router.refresh(); },
  });

  return (
    <div className='my-4 flex flex-col gap-4'>
      <Table data={orders} page={page} totalPages={totalPages} rowsPerPage={rowsPerPage} />
    </div>
  )
}

export default OrderComponent

