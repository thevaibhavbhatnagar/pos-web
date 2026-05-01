import React from 'react'

import apiEndpoints from '@/utils/endpoints';
import axiosInstance from '@/utils/axiosInstance';
  
import RoleComponent from './_components';
import { GroupedModule } from '@/types/permission/details';


// Force dynamic rendering (disables Next.js static optimization)
export const dynamic = "force-dynamic";

export default async function Page({ searchParams }: { searchParams: Promise<{ page?: string; search?: string; sort_by?: string; sort_dir?: string }> }) {

  // Await the searchParams before using
  const params = await searchParams;

  // Call backend API to fetch user list
  const response = await axiosInstance.get(apiEndpoints.permission.list) 

  const permissions: GroupedModule[] = response?.data?.data || [];
 console.log("permissions__________settings",permissions[1])
 const buildMenu = (items:any) => {
  return items.map((item:any) => ({ 
      name: item.name,
      url: item.url,
      icon: item.icon,
      children: item.children ? buildMenu(item.children) : [],
    }));
};

const result = buildMenu(permissions);  
 return (
    <div className="">
 {/* <pre>{JSON.stringify(result, null, 2)}</pre> */}
    <RoleComponent permissions={permissions} />
    </div>
  )
}

