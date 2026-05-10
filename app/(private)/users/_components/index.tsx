"use client"
import React, { use, useState } from 'react'

import Add from './add'
import Table from './table'

import useUserForm from '@/hooks/use-user-form'

import { UserFormType } from '@/types/user/form'
import { UserListType } from '@/types/user/list'
import { useRouter } from 'next/navigation'

type Props = {
  users: UserListType[];
  page: number;
  totalPages: number;
  rowsPerPage: number;
  totalItems?: number;
  roles: { label: string; value: string }[]
  branches: { label: string; value: string }[]
}

const UserComponent: React.FC<Props> = ({ users, page, totalPages, rowsPerPage,totalItems,roles,branches }) => {

  const [user, setUser] = useState<UserFormType | undefined>(undefined);

  const router = useRouter();

  const { useUserFormik } = useUserForm({
    user: user,
    onResetToAdd: () => setUser(undefined),
    onSuccess: () => {router.refresh();},
  });

  return (
    <div className='my-4 flex flex-col gap-4'>
      <Add useUserFormik={useUserFormik} isEdit={!!user} onResetToAdd={() => setUser(undefined)} branches={branches} roles={roles}/>
      <Table data={users} onEdit={(user: UserFormType) => setUser(user)} onResetToAdd={() => setUser(undefined)} page={page} totalPages={totalPages} rowsPerPage={rowsPerPage} totalItems={totalItems} />
    </div>
  )
}

export default UserComponent

