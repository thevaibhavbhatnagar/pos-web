"use client"
import React, { use, useState } from 'react'

import Add from './add'
import Table from './table'
 

import { CategoryFormType } from '@/types/category/form' 
import { CategoryListType } from '@/types/category/list'
import { useRouter } from 'next/navigation'
import useCategoryForm from '@/hooks/use-category-form'

type Props = { 
  page: number;
  totalPages: number;
  rowsPerPage: number; 
  categories : CategoryListType[];
  statuses : { label: string; value: string }[];
}

const CategoryComponent: React.FC<Props> = ({categories,page, totalPages, rowsPerPage,statuses }) => {

  const [category, setCategory] = useState<CategoryFormType | undefined>(undefined);

  const router = useRouter();

  const { useCategoryFormik } = useCategoryForm({
    category: category,
    onResetToAdd: () => setCategory(undefined),
    onSuccess: () => {router.refresh();},
  });

  return (
    <div className='my-4 grid grid-cols-1 md:grid-cols-3 gap-4'>
      <Add formik={useCategoryFormik} isEdit={!!category} onResetToAdd={() => setCategory(undefined)}  statuses={statuses}/>
      <Table data={categories} onEdit={(category: CategoryFormType) => setCategory(category)} onResetToAdd={() => setCategory(undefined)} page={page} totalPages={totalPages} rowsPerPage={rowsPerPage} />
    </div>
  )
}

export default CategoryComponent

