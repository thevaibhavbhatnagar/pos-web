"use client"
import React from 'react'
import { ProductListType } from '@/types/product/list'
import Items from './items'

type Props = {
  page: number;
  totalPages: number;
  rowsPerPage: number;
  products: ProductListType[];
  categories: { label: string; value: string }[];
  statuses: { label: string; value: string }[];
}

const PosComponent: React.FC<Props> = ({ products, categories, page, totalPages, rowsPerPage, statuses }) => {

  return (
    <div className='my-4 flex gap-4'>
      <Items categories={categories} products={products} />
    </div>
  )
}

export default PosComponent

