"use client"
import React, { use, useState } from 'react'

import Add from './add'
import Table from './table'
 

import { CategoryFormType } from '@/types/category/form'  
import { useRouter } from 'next/navigation'
import useCategoryForm from '@/hooks/use-category-form'
import { ProductListType } from '@/types/product/list'
import useProductForm from '@/hooks/use-products-form'
import { ProductFormType } from '@/types/product/form'

type Props = { 
  page: number;
  totalPages: number;
  rowsPerPage: number; 
  products : ProductListType[];
  categories : { label: string; value: string }[];
  statuses : { label: string; value: string }[];
}

const ProductComponent: React.FC<Props> = ({products,categories,page, totalPages, rowsPerPage,statuses }) => {

  const [product, setProduct] = useState<ProductFormType | undefined>(undefined);

  const router = useRouter();

  const { useProductFormik } = useProductForm({
    product: product,
    onResetToAdd: () => setProduct(undefined),
    onSuccess: () => {router.refresh();},
  });

  return (
    <div className='my-4 grid grid-cols-1 md:grid-cols-3 gap-4'>
      <Add formik={useProductFormik} isEdit={!!product} onResetToAdd={() => setProduct(undefined)}  categories={categories} statuses={statuses}/>
      <Table data={products} onEdit={(product: ProductFormType) => setProduct(product)} onResetToAdd={() => setProduct(undefined)} page={page} totalPages={totalPages} rowsPerPage={rowsPerPage} />
    </div>
  )
}

export default ProductComponent

