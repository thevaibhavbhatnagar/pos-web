"use client"
import React, { use, useState } from 'react'

import Add from './add'
import Table from './table'

import useBranchForm from '@/hooks/use-branch-form'

import { BranchFormType } from '@/types/branch/form'
import { BranchListType } from '@/types/branch/list'
import { useRouter } from 'next/navigation'

type Props = {
  branches: BranchListType[]; 
  page: number;
  totalPages: number;
  rowsPerPage: number;
  totalItems?: number;
}

const BranchesComponent: React.FC<Props> = ({ branches, page, totalPages, rowsPerPage,totalItems }) => {

  const [branch, setBranch] = useState<BranchFormType | undefined>(undefined);

  const router = useRouter();
  
  const { useBranchFormik } = useBranchForm({
    branch: branch,
    onResetToAdd: () => setBranch(undefined),
    onSuccess: () => router.refresh(),
  });

  return (
    <div className='my-4 flex flex-col gap-4'>
      <Add useBranchFormik={useBranchFormik} isEdit={!!branch} onResetToAdd={() => setBranch(undefined)} />
      <Table data={branches} onEdit={(branch: BranchFormType) => setBranch(branch)} onResetToAdd={() => setBranch(undefined)} page={page} totalPages={totalPages} rowsPerPage={rowsPerPage} totalItems={totalItems} />
    </div>
  )
}

export default BranchesComponent

