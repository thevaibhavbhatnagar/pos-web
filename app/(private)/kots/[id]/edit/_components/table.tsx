"use client"
import React from 'react' 
import { Column, DataTable } from '@/ui/data-table'
import { KotItem } from '@/types/kot/details';

type Props = {
    data: KotItem[];
    page: number;
    totalPages: number;
    rowsPerPage: number;
}

const Table: React.FC<Props> = ({ data, page, totalPages, rowsPerPage }) => {


    const columns: Column<KotItem>[] = [
        {
            key: "srNo",
            label: "Sr. No",
            renderCell: (_, rowIndex) => (rowIndex ?? 0) + 1, // rowIndex starts at 0
        },
        {
            key: "kotId",
            label: "KOT Id",
            renderCell: (value) => value?.kotId ?? "N/A",
        },

        {
            key: "quantity",
            label: "Quantity",
            renderCell: (value) => value?.quantity ?? 0,
        },

        {
            key: "price",
            label: "Price",
            renderCell: (value) => `₹${value?.product.price ?? 0}`,
        },

        {
            key: "total",
            label: "Total",
            renderCell: (value) =>
                `₹${(value?.quantity ?? 0) * (value?.product.price ?? 0)}`,
        },

    ];

    return (
        <div className='py-3 rounded-lg w-full h-full bg-surface md:col-span-2'>
            <DataTable columns={columns} data={data} pagination={{ page: page, totalPages: totalPages, rowsPerPage: rowsPerPage }} wrapperClassName="max-h-[400px]" />
        </div>
    )
}

export default Table
