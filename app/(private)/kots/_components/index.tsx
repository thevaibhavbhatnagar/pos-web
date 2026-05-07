"use client"
import React from 'react' 
import Table from './table' 
import { KotListType } from '@/types/kot/list'

type Props = { 
  page: number;
  totalPages: number;
  rowsPerPage: number; 
  kots :  KotListType[]; 
}

const KotComponent: React.FC<Props> = ({page, totalPages, rowsPerPage,kots }) => {
  
  return (
    <div className='my-4 flex gap-4'> 
      <Table data={kots} page={page} totalPages={totalPages} rowsPerPage={rowsPerPage} />
    </div>
  )
}

export default KotComponent

