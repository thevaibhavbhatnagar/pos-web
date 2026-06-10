"use client"
import React, { useState } from 'react'
import { Chip } from '@heroui/react';
import { ListChevronsUpDown, Pencil, Trash2, TriangleAlert } from 'lucide-react';

import Modal from '@/ui/modal';

import { Column, DataTable } from '@/ui/data-table'


import useProductDelete from '@/hooks/use-product-delete';
import { KotListType } from '@/types/kot/list';
import { useRouter } from 'next/navigation';
import useKotDelete from '@/hooks/use-kot-delete';


type Props = {
    data: KotListType[];
    page: number;
    totalPages: number;
    rowsPerPage: number;
    totalItems?: number;
}

const Table: React.FC<Props> = ({ data, page, totalPages, rowsPerPage, totalItems }) => {


    const [isOpen, setIsOpen] = useState(false);

    const onOpen = () => setIsOpen(true);
    const onOpenChange = () => setIsOpen(false);

    const router = useRouter();

    // Custom hook to handle deletion of a commission type
    const { onDelete } = useKotDelete({ onOpenChange });

    // State to store the currently selected commission type for deletion or editing
    const [kot, setKot] = useState<KotListType | undefined>();

    // Function to handle editing: calls parent prop function with selected commission type
    const handleEdit = (data: KotListType) => {
        router.push(`/kots/${data.id}/edit`)
    }

    // Function to handle delete action: opens the modal and sets selected commission type
    const handleDelete = (data: KotListType) => {
        onOpen();
        setKot(data);
    }

    const columns: Column<KotListType>[] = [
        {
            key: "srNo",
            label: "Sr. No",
            renderCell: (_, rowIndex) => (rowIndex ?? 0) + 1, // rowIndex starts at 0
        },
        { key: "kotNo", label: "Kot No", renderCell: (value) => value?.kotNo ?? "N/A" },
        { key: "orderNo", label: "Bill No", renderCell: (value) => value?.order?.billNo ?? "N/A" },

        {
            key: "status",
            label: "Status",

            renderCell: (value) => {
                const statusStyles: Record<string, string> = {
                    PENDING:
                        "bg-[var(--chip-pending)] text-[var(--chip-pending-text)]",

                    PREPARING:
                        "bg-[var(--chip-inactive)] text-[var(--chip-inactive-text)]",

                    READY:
                        "bg-[var(--chip-active)] text-[var(--chip-active-text)]",

                    SERVED:
                        "bg-[var(--chip-active)] text-[var(--chip-active-text)]",
                };

                return (
                    <Chip
                        size="sm"
                        className={
                            statusStyles[
                            value.status as keyof typeof statusStyles
                            ]
                        }
                    >
                        {value.status}
                    </Chip>
                );
            },
        },
        {
            key: "action", label: "Action", renderCell: (value) =>
                value.status === "PENDING" && (
                    <div className="relative flex items-center gap-2">
                        {/* EDIT */}
                        <button
                            onClick={() => handleEdit(value)}
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
                )
        }
    ];

    return (
        <div className='py-3 rounded-lg w-full h-full bg-surface md:col-span-2'>
            <div className="flex flex-col md:flex-row gap-2 md:gap-0 w-full justify-between px-3 mb-2">
                <div className="flex gap-2 items-center">
                    <div className="rounded-lg bg-primary/10 text-primary  flex items-center justify-center aspect-square w-6 h-6 ">
                        <ListChevronsUpDown width={18} />
                    </div>
                    <h2 className='text-base font-medium'>Kots List</h2>
                </div>
                {/* <Search /> */}
            </div>
            <DataTable columns={columns} data={data} pagination={{ page: page, totalPages: totalPages, rowsPerPage: rowsPerPage, totalItems: totalItems }} />
            <Modal
                title="Delete Confirmation"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                footerActions={[
                    { label: "Close", variant: "danger", onPress: () => onOpenChange() },
                    { label: "Confirm", variant: "primary", onPress: () => onDelete(kot?.id) },
                ]}
            >
                <div className="flex items-center justify-center">
                    <div className="flex items-center justify-center rounded-full bg-[#FFECEC] p-3">
                        <TriangleAlert className="text-[#FF5F5F]" size={28} />
                    </div>
                </div>
                <p className="text-sm text-default-600"> Are you sure you want to delete this kot? <span className='font-semibold underline'>{kot?.kotNo}</span> </p>
            </Modal>
        </div>
    )
}

export default Table
