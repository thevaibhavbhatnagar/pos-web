"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { Chip } from '@heroui/react';
import { Delete, Edit, ListChevronsUpDown, Pencil, PlusIcon, Trash2, TriangleAlert } from 'lucide-react';

import Modal from '@/ui/modal';
import Search from '@/ui/search';
import { Column, DataTable } from '@/ui/data-table'

import useOrderDelete from '@/hooks/use-order-delete';

import { OrderListType } from '@/types/order/list';
import Button from '@/ui/button';


type Props = {
    data: OrderListType[];
    page: number;
    totalPages: number;
    rowsPerPage: number;
}

const Table: React.FC<Props> = ({ data, page, totalPages, rowsPerPage }) => {

    // Hook from Hero UI to manage modal open/close state

    const [isOpen, setIsOpen] = useState(false);

    const onOpen = () => setIsOpen(true);
    const onOpenChange = () => setIsOpen(false);

    // Custom hook to handle deletion of a commission type
    const { onDelete } = useOrderDelete({ onOpenChange });

    // State to store the currently selected commission type for deletion or editing
    const [order, setorder] = useState<OrderListType | undefined>();

    const router = useRouter();


    // Function to handle delete action: opens the modal and sets selected commission type
    const handleDelete = (order: OrderListType) => {
        onOpen();
        setorder(order);
    }

    const columns: Column<OrderListType>[] = [
        {
            key: "srNo",
            label: "Sr. No",
            renderCell: (_, rowIndex) => (rowIndex ?? 0) + 1, // rowIndex starts at 0
        },
        { key: "billNo", label: "Bill No" },
        // { key: "totalAmount", label: "Total Amount" },
        // { key: "subTotal", label: "Sub Total" },
        // { key: "discountAmount", label: "Discount Amount" },
        // { key: "taxAmount", label: "Tax Amount" },

        { key: "paymentMethod", label: "Payment Method" },
        { key: "status", label: "Status" }, 

        // { key: "branch.name", label: "Branch Name" , renderCell:(value) => value.branch.name},

        // { key: "user.name", label: "User Name", renderCell:(value) => value.user.name },
        // { key: "user.email", label: "User Email", renderCell:(value) => value.user.email },

        { key: "createdAt", label: "Created At" },
        { key: "updatedAt", label: "Updated At" },
    
    {
        key: "action",
            label: "Action",
                renderCell: (value) => (
                    <div className="flex items-center gap-3">

                        {/* EDIT */}
                        <button
                            onClick={() => router.push(`/orders/${value.id}/edit`)}
                            className="p-1.5 rounded-md text-muted hover:text-primary hover:bg-primary/10 transition"
                        >
                            <Pencil size={18} />
                        </button>

                        {/* DELETE */}
                        <button
                            onClick={() => handleDelete(value)}
                            className="p-1.5 rounded-md text-muted hover:text-red-500 hover:bg-red-500/10 transition"
                        >
                            <Trash2 size={18} />
                        </button>

                    </div>
                ),
        }
    ];

return (
    <div className='py-3 rounded-lg w-full h-full flex flex-col gap-4 bg-surface'>
        <div className="flex flex-col md:flex-row gap-2 md:gap-0 justify-between px-3 mb-2">
            <div className="flex gap-2 items-center">
                <div className="rounded-lg bg-primary/10 text-primary  flex items-center justify-center aspect-square w-6 h-6 ">
                    <ListChevronsUpDown width={18} />
                </div>
                <h2 className='text-base font-medium'>Orders List</h2>
            </div>
            <div className="flex gap-4">
                {/* <Search className='w-full' /> */}
                <Button type="button" startIcon={PlusIcon} onClick={() => router.push("/orders/add")}>ADD</Button>

            </div>
        </div>
        <DataTable columns={columns} data={data} pagination={{ page: page, totalPages: totalPages, rowsPerPage: rowsPerPage }} wrapperClassName="max-h-[400px]" />
        <Modal
            title="Delete Confirmation"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            footerActions={[
                { label: "Close", variant: "danger-soft", onPress: () => onOpenChange() },
                { label: "Confirm", onPress: () => onDelete(order?.id) },
            ]}
        >
            <div className="flex items-center justify-center">
                <div className="flex items-center justify-center rounded-full bg-[#FFECEC] p-3">
                    <TriangleAlert className="text-[#FF5F5F]" size={28} />
                </div>
            </div>
            <p className="text-sm text-default-600"> Are you sure you want to delete this order? <span className='font-semibold underline'>{order?.id}</span> </p>
        </Modal>
    </div>
)
}

export default Table
