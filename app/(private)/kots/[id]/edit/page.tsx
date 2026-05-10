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
import KotComponent from './_components';
import axios from 'axios';
import { KotDetailsType } from '@/types/kot/details';

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

  const response = await axiosInstance.get(`${apiEndpoints.kot.details(id)}`)

  const data: KotDetailsType = response?.data?.data;

  return (
    <KotComponent kot={data} />
  )
}

