"use client"
import React from 'react' 
import { Column, DataTable } from '@/ui/data-table'
import { OrderItem } from '@/types/kot/details';

type Props = {
    data: OrderItem[];
    page: number;
    totalPages: number;
    rowsPerPage: number;
}

const Table: React.FC<Props> = ({ data, page, totalPages, rowsPerPage }) => {


    const columns: Column<OrderItem>[] = [
        {
            key: "srNo",
            label: "Sr. No",
            renderCell: (_, rowIndex) => (rowIndex ?? 0) + 1, // rowIndex starts at 0
        },
        {
            key: "productId",
            label: "Product Id",
            renderCell: (value) => value?.product?.name ?? "N/A",
        },

        {
            key: "quantity",
            label: "Quantity",
            renderCell: (value) => value?.quantity ?? 0,
        },

        {
            key: "price",
            label: "Price",
            renderCell: (value) => `₹${value?.price ?? 0}`,
        },

        {
            key: "total",
            label: "Total",
            renderCell: (value) =>
                `₹${(value?.quantity ?? 0) * (value?.price ?? 0)}`,
        },

    ];

    return (
        <div className='py-3 rounded-lg w-full h-full bg-surface md:col-span-2'>
            <DataTable columns={columns} data={data} pagination={{ page: page, totalPages: totalPages, rowsPerPage: rowsPerPage }} wrapperClassName="max-h-[400px]" />
        </div>
    )
}

export default Table
