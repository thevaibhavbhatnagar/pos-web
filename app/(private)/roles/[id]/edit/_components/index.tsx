"use client"
import React from 'react'
import { useRouter } from 'next/navigation' 

import Add from './add' 
import useRoleEditForm from '@/hooks/use-role-edit-form'

import { RoleDetailsType } from '@/types/role/details' 
import { PermissionsByModuleType } from '@/types/permission/list'
import { GroupedModule } from '@/types/permission/details'

type Props = { 
  roles: { label: string; value: string }[]; 
  role: RoleDetailsType;
  permissions:GroupedModule[]

}

const RoleComponent: React.FC<Props> = ({roles, role, permissions}) => {
  const router = useRouter();

  const { useRoleEditFormik } = useRoleEditForm({ 
    role:role,
    onSuccess: () => {window.location.href = "/roles";},
  });

  return (
    <div className='my-4 flex flex-col gap-4'>
      {/* {JSON.stringify(role)} */}
      <Add formik={useRoleEditFormik} roles={roles} permissions={permissions} />
      {/* <Table data={users} onEdit={(user: UserFormType) => setUser(user)} onResetToAdd={() => setUser(undefined)} page={page} totalPages={totalPages} rowsPerPage={rowsPerPage} /> */}
    </div>
  )
}

export default RoleComponent

