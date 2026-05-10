"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

import Table from './table'

import useRoleForm from '@/hooks/use-role-form'
import { RoleListType } from '@/types/role/list'

type Props = {
  roles: RoleListType[];
  page: number;
  totalPages: number;
  rowsPerPage: number;
  totalItems?: number;

}

const RoleComponent: React.FC<Props> = ({ roles, page, totalPages, rowsPerPage, totalItems }) => {

  const router = useRouter();

  const { useRoleFormik } = useRoleForm({
    onSuccess: () => { router.refresh(); },
  });

  return (
    <div className='my-4 flex flex-col gap-4'>
      <Table data={roles} page={page} totalPages={totalPages} rowsPerPage={rowsPerPage} totalItems={totalItems} />
    </div>
  )
}

export default RoleComponent

