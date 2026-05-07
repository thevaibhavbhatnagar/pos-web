"use client"
import React, {useState } from 'react'

import Add from './add'
import Table from './table'
 
import { useRouter } from 'next/navigation' 
import { ProductListType } from '@/types/product/list'
import useProductForm from '@/hooks/use-products-form'
import { ProductFormType } from '@/types/product/form'
import Items from './items'

type Props = { 
  page: number;
  totalPages: number;
  rowsPerPage: number; 
  products : ProductListType[];
  categories : { label: string; value: string }[];
  statuses : { label: string; value: string }[];
}

const PosComponent: React.FC<Props> = ({products,categories,page, totalPages, rowsPerPage,statuses }) => {

  const [product, setProduct] = useState<ProductFormType | undefined>(undefined);

  const router = useRouter();

  const { useProductFormik } = useProductForm({
    product: product,
    onResetToAdd: () => setProduct(undefined),
    onSuccess: () => {router.refresh();},
  });

  return (
    <div className='my-4 flex gap-4'>
      <Items categories={categories} products={products}/>
      {/* <Add formik={useProductFormik} isEdit={!!product} onResetToAdd={() => setProduct(undefined)}  categories={categories} statuses={statuses}/> */}
      {/* <Table data={products} onEdit={(product: ProductFormType) => setProduct(product)} onResetToAdd={() => setProduct(undefined)} page={page} totalPages={totalPages} rowsPerPage={rowsPerPage} /> */}
    </div>
  )
}

export default PosComponent

