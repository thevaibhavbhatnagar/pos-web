"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { Chip } from '@heroui/react';
import { Delete, Edit, ListChevronsUpDown, Pencil, PlusIcon, Trash2, TriangleAlert } from 'lucide-react';

import Modal from '@/ui/modal';
import Search from '@/ui/search';
import { Column, DataTable } from '@/ui/data-table'

import useUserDelete from '@/hooks/use-role-delete';

import { RoleListType } from '@/types/role/list';
import Button from '@/ui/button';


type Props = {
    data: RoleListType[];
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
    const { onDelete } = useUserDelete({ onOpenChange });

    // State to store the currently selected commission type for deletion or editing
    const [role, setRole] = useState<RoleListType | undefined>();

    const router = useRouter();


    // Function to handle delete action: opens the modal and sets selected commission type
    const handleDelete = (role: RoleListType) => {
        onOpen();
        setRole(role);
    }

    const columns: Column<RoleListType>[] = [
        {
            key: "srNo",
            label: "Sr. No",
            renderCell: (_, rowIndex) => (rowIndex ?? 0) + 1, // rowIndex starts at 0
        },
        { key: "name", label: "Full Name" },

        {
            key: "action",
            label: "Action",
            renderCell: (value) => (
                <div className="flex items-center gap-3">

                    {/* EDIT */}
                    <button
                        onClick={() => router.push(`/roles/${value.id}/edit`)}
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
                    <h2 className='text-base font-medium'>Roles List</h2>
                </div>
                <div className="flex gap-4">
                    {/* <Search className='w-full' /> */}
                    <Button type="button" startIcon={PlusIcon} onClick={() => router.push("/roles/add")}>ADD</Button>

                </div>
            </div>
            <DataTable columns={columns} data={data} pagination={{ page: page, totalPages: totalPages, rowsPerPage: rowsPerPage }} wrapperClassName="max-h-[400px]" />
            <Modal
                title="Delete Confirmation"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                // footerActions={[
                //     { label: "Close", color: "danger", radius: "sm", onPress: () => onOpenChange() },
                //     { label: "Confirm", color: "primary", radius: "sm", variant: "solid", onPress: () => onDelete(role?.id) },
                // ]}
                size='sm'
            >
                <div className="flex items-center justify-center">
                    <div className="flex items-center justify-center rounded-full bg-[#FFECEC] p-3">
                        <TriangleAlert className="text-[#FF5F5F]" size={28} />
                    </div>
                </div>
                <p className="text-sm text-default-600"> Are you sure you want to delete this role? <span className='font-semibold underline'>{role?.name}</span> </p>
            </Modal>
        </div>
    )
}

export default Table
