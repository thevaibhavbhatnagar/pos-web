"use client"
import React from 'react'
import { OrderDetailsType } from '@/types/order/details'
import Items from './items';
import { ProductListType } from '@/types/product/list';

type Props = {
  order: OrderDetailsType;
  categories: { label: string; value: string }[];
  products: ProductListType[];
  id: string;
}

const OrderComponent: React.FC<Props> = ({ order,categories,products,id }) => {

  return (
    <div className='my-4 flex flex-col gap-4'>
      <Items order={order} categories={categories} products={products} id={id} />
    </div>
  )
}

export default OrderComponent

