"use client"
import React, { useState } from 'react'

import Add from './add'
import Table from './table'

import { AddonFormType } from '@/types/addon/form'
import { AddonListType } from '@/types/addon/list'
import { useRouter } from 'next/navigation'
import useAddonForm from '@/hooks/use-addon-form'

type Props = {
  page: number;
  totalPages: number;
  rowsPerPage: number;
  addons: AddonListType[];
  statuses: { label: string; value: string }[];
  totalItems?: number;
}

const AddonComponent: React.FC<Props> = ({ addons, page, totalPages, rowsPerPage, statuses, totalItems }) => {
  const [addon, setAddon] = useState<AddonFormType | undefined>(undefined);
  const router = useRouter();

  const { useAddonFormik } = useAddonForm({
    addon: addon,
    onResetToAdd: () => setAddon(undefined),
    onSuccess: () => { router.refresh(); },
  });

  return (
    <div className='my-4 grid grid-cols-1 md:grid-cols-3 gap-4'>
      <Add formik={useAddonFormik} isEdit={!!addon} onResetToAdd={() => setAddon(undefined)} statuses={statuses} />
      <Table data={addons} onEdit={(addon: AddonFormType) => setAddon(addon)} onResetToAdd={() => setAddon(undefined)} page={page} totalPages={totalPages} rowsPerPage={rowsPerPage} totalItems={totalItems} />
    </div>
  )
}

export default AddonComponent;
