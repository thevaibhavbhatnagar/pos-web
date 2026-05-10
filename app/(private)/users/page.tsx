import React from 'react'

import apiEndpoints from '@/utils/endpoints';
import axiosInstance from '@/utils/axiosInstance';

import UserComponent from './_components'
import { UserListType } from '@/types/user/list';
import { RoleListType } from '@/types/role/list'; 
import { BranchListType } from '@/types/branch/list';


// Force dynamic rendering (disables Next.js static optimization)
export const dynamic = "force-dynamic";

export default async function Page({ searchParams }: { searchParams: Promise<{ page?: string; search?: string; sort_by?: string; sort_dir?: string }> }) {

  // ✅ Await the searchParams before using
  const params = await searchParams;

  const page = Number(params.page || 1);
  const limit = 10;

  // Call backend API to fetch user list
  const [userResponse, roleResponse, branchResponse] = await Promise.all([
    axiosInstance.get(apiEndpoints.user.list, { params: { page, limit } }),
    axiosInstance.get(apiEndpoints.role.list, { params: { page: 1, limit: 100 } }),
    axiosInstance.get(apiEndpoints.branch.list, { params: { page: 1, limit: 100 } })
  ]);

  // Safely extract users array from API response
  // If data is missing, fallback to empty array
  const users: UserListType[] = userResponse?.data?.data || [];

  const rolesList: RoleListType[] = roleResponse?.data?.data || [];

  const roles = rolesList.reduce<{ label: string; value: string }[]>((acc, role) => {
    acc.push({ label: role.name, value: role.id });
    return acc;
  }, []);

  const branchesList: BranchListType[] = branchResponse?.data?.data || [];

  const branches = branchesList.reduce<{ label: string; value: string }[]>((acc, branch) => {
    acc.push({ label: branch.name, value: branch.id });
    return acc;
  }, []);

  const totalPages = userResponse?.data?.meta?.totalPages;

  const totalItems = userResponse?.data?.meta?.total; 

  return (
    <UserComponent users={users} page={page} totalPages={totalPages} rowsPerPage={limit} totalItems={totalItems} branches={branches} roles={roles} />
  )
}

