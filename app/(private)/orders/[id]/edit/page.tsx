import React from 'react'

import apiEndpoints from '@/utils/endpoints';
import axiosInstance from '@/utils/axiosInstance';

import UserComponent from './_components'
import { UserListType } from '@/types/user/list';
import { RoleListType } from '@/types/role/list';
import RoleComponent from './_components'; 
import { RoleDetailsType } from '@/types/role/details';
import { PermissionsByModuleType } from '@/types/permission/list';
import { GroupedModule } from '@/types/permission/details';

const userTypes = [
  { label: "Admin", value: "Admin" },
  { label: "Company", value: "Company" },
  { label: "Branch", value: "Branch" },
];


// Force dynamic rendering (disables Next.js static optimization)
export const dynamic = "force-dynamic";

type Props = {
 params: Promise<{ id: string }>
  searchParams: Promise<{ page?: string; search?: string; sort_by?: string; sort_dir?: string; id?: string }> 
};

export default async function Page({ params, searchParams }: Props) {

    const { id } = await params; 

  // Call backend API to fetch user list
  const [permissionsResponse, rolesResponse, roleDetailsResponse] = await Promise.all([
    await axiosInstance.get(apiEndpoints.permission.list) ,
    await axiosInstance.get(apiEndpoints.role.list, { params: { page: 1, limit: 100 } }) ,
    await axiosInstance.get(apiEndpoints.role.permissionsbyRoleId(id)) 
  ])

  const rolesList: RoleListType[] = rolesResponse?.data?.data || [];

  const roles = rolesList.reduce<{ label: string; value: string }[]>((acc, role) => {
    acc.push({ label: role.name, value: role.id });
    return acc;
  }, []);

  const role: any = roleDetailsResponse?.data?.data || {};
  const permissions: GroupedModule[] = permissionsResponse?.data?.data ?? [];
//  console.log("role.permissionsByModule.permissions",role.permissionsByModule)
 console.log("permissions",permissions)
  return (
    <RoleComponent roles={roles} role={role} permissions={permissions} />
  )
}

