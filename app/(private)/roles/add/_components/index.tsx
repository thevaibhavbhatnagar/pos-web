"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

import Add from './add'
import useRoleForm from '@/hooks/use-role-form'
import { GroupedModule } from '@/types/permission/details'

type Props = {
  permissions: GroupedModule[];
}

const RoleComponent: React.FC<Props> = ({ permissions }) => {

  const router = useRouter();

  const { useRoleFormik } = useRoleForm({
    onSuccess: () => { router.push("/roles"); },
  });

  return (
    <div className='my-4 flex flex-col gap-4'>
      <Add formik={useRoleFormik} permissions={permissions} />
      {/* <Table data={users} onEdit={(user: UserFormType) => setUser(user)} onResetToAdd={() => setUser(undefined)} page={page} totalPages={totalPages} rowsPerPage={rowsPerPage} /> */}
    </div>
  )
}

export default RoleComponent

