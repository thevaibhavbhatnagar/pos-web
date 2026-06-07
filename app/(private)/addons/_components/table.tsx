"use client"
import React, { useState } from 'react'
import { Chip } from '@heroui/react';
import { ListChevronsUpDown, Pencil, Trash2, TriangleAlert } from 'lucide-react';

import Modal from '@/ui/modal';

import { Column, DataTable } from '@/ui/data-table'

import { AddonListType } from '@/types/addon/list';
import { AddonFormType } from '@/types/addon/form';
import useAddonDelete from '@/hooks/use-addon-delete';

type Props = {
    data: AddonListType[];
    onEdit: (addon: AddonFormType) => void;
    onResetToAdd: () => void;
    page: number;
    totalPages: number;
    rowsPerPage: number;
    totalItems?: number;
}

const Table: React.FC<Props> = ({ data, onEdit, onResetToAdd, page, totalPages, rowsPerPage, totalItems }) => {
    const [isOpen, setIsOpen] = useState(false);

    const onOpen = () => setIsOpen(true);
    const onOpenChange = () => setIsOpen(false);

    const { onDelete } = useAddonDelete({ onOpenChange, onResetToAdd });

    const [addon, setAddon] = useState<AddonListType | undefined>();

    const handleEdit = (data: AddonListType) => {
        const payload = {
            id: data.id,
            name: data.name,
            price: data.price.toString(),
            isActive: data.isActive?.toString(),
        }
        onEdit(payload)
    }

    const handleDelete = (item: AddonListType) => {
        onOpen();
        setAddon(item);
    }

    const columns: Column<AddonListType>[] = [
        {
            key: "srNo",
            label: "Sr. No",
            renderCell: (_, rowIndex) => (rowIndex ?? 0) + 1,
        },
        { key: "name", label: "Name", renderCell: (value) => value?.name ?? "N/A" },
        { key: "price", label: "Price", renderCell: (value) => value?.price ?? "N/A" },
        {
            key: "isActive", label: "Status", renderCell: (value) => (
                <Chip size='sm'
                    className={
                        value.isActive
                            ? "bg-chip-active text-chip-text-active dark:bg-chip-active-dark dark:text-chip-text-active-dark"
                            : "bg-chip-pending text-chip-text-pending dark:bg-chip-pending-dark dark:text-chip-text-pending-dark"
                    } >{value.isActive ? "Active" : "Inactive"}</Chip>
            )
        },
        {
            key: "action", label: "Action", renderCell: (value) =>
                <div className="relative flex items-center gap-2">
                    <button
                        onClick={() => handleEdit(value)}
                        className="p-1.5 rounded-md text-muted hover:text-primary hover:bg-primary/10 transition"
                    >
                        <Pencil size={18} />
                    </button>

                    <button
                        onClick={() => handleDelete(value)}
                        className="p-1.5 rounded-md text-muted hover:text-red-500 hover:bg-red-500/10 transition"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
        }
    ];

    return (
        <div className='py-3 rounded-lg w-full h-full bg-surface md:col-span-2'>
            <div className="flex flex-col md:flex-row gap-2 md:gap-0 w-full justify-between px-3 mb-2">
                <div className="flex gap-2 items-center">
                    <div className="rounded-lg bg-primary/10 text-primary flex items-center justify-center aspect-square w-6 h-6 ">
                        <ListChevronsUpDown width={18} />
                    </div>
                    <h2 className='text-base font-medium'>Addons List</h2>
                </div>
            </div>
            <DataTable columns={columns} data={data} pagination={{ page: page, totalPages: totalPages, rowsPerPage: rowsPerPage, totalItems: totalItems }} wrapperClassName="max-h-[448px]" />
            <Modal
                title="Delete Confirmation"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                footerActions={[
                    { label: "Close", variant: "danger-soft", onPress: () => onOpenChange() },
                    { label: "Confirm", onPress: () => onDelete(addon?.id) },
                ]}
            >
                <div className="flex items-center justify-center">
                    <div className="flex items-center justify-center rounded-full bg-[#FFECEC] p-3">
                        <TriangleAlert className="text-[#FF5F5F]" size={28} />
                    </div>
                </div>
                <p className="text-sm text-default-600"> Are you sure you want to delete this Addon? <span className='font-semibold underline'>{addon?.name}</span> </p>
            </Modal>
        </div>
    )
}

export default Table
