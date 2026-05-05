"use client"
import React, { useState } from 'react'
import { Chip } from '@heroui/react';
import { ListChevronsUpDown, Pencil, Trash2, TriangleAlert } from 'lucide-react';

import Modal from '@/ui/modal';

import { Column, DataTable } from '@/ui/data-table'

import { CategoryListType } from '@/types/category/list';
import { CategoryFormType } from '@/types/category/form';
import useCategoryDelete from '@/hooks/use-category-delete';


type Props = {
    data: CategoryListType[];
    onEdit: (user: CategoryFormType) => void;
    onResetToAdd: () => void;
    page: number;
    totalPages: number;
    rowsPerPage: number;
}

const Table: React.FC<Props> = ({ data, onEdit, onResetToAdd, page, totalPages, rowsPerPage }) => {


    const [isOpen, setIsOpen] = useState(false);

    const onOpen = () => setIsOpen(true);
    const onOpenChange = () => setIsOpen(false);

    // Custom hook to handle deletion of a commission type
    const { onDelete } = useCategoryDelete({ onOpenChange, onResetToAdd });

    // State to store the currently selected commission type for deletion or editing
    const [category, setCategory] = useState<CategoryListType | undefined>();

    // Function to handle editing: calls parent prop function with selected commission type
    const handleEdit = (data: CategoryListType) => {
        const payload = {
            id: data.id,
            name: data.name,
            isActive: data.isActive?.toString(),
        }
        onEdit(payload)
    }

    // Function to handle delete action: opens the modal and sets selected commission type
    const handleDelete = (user: CategoryListType) => {
        onOpen();
        setCategory(user);
    }

    const columns: Column<CategoryListType>[] = [
        {
            key: "srNo",
            label: "Sr. No",
            renderCell: (_, rowIndex) => (rowIndex ?? 0) + 1, // rowIndex starts at 0
        },
        { key: "name", label: "Name", renderCell: (value) => value?.name ?? "N/A" },
        {
            key: "isActive", label: "Status", renderCell: (value) => (
                <Chip size='sm'
                    className={
                        value.isActive
                            ? "bg-chips-active text-chips-text-active dark:bg-chips-active-dark dark:text-chips-text-active-dark"
                            : "bg-chips-pending text-chips-text-pending dark:bg-chips-pending-dark dark:text-chips-text-pending-dark"
                    } >{value.isActive ? "Active" : "Inactive"}</Chip>
            )
        },
        {
            key: "action", label: "Action", renderCell: (value) =>
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
        }
    ];

    return (
        <div className='py-3 rounded-lg w-full h-full bg-surface md:col-span-2'>
            <div className="flex flex-col md:flex-row gap-2 md:gap-0 w-full justify-between px-3 mb-2">
                <div className="flex gap-2 items-center">
                    <div className="rounded-lg bg-primary/10 text-primary  flex items-center justify-center aspect-square w-6 h-6 ">
                        <ListChevronsUpDown width={18} />
                    </div>
                    <h2 className='text-base font-medium'>Categories List</h2>
                </div>
                {/* <Search /> */}
            </div>
            <DataTable columns={columns} data={data} pagination={{ page: page, totalPages: totalPages, rowsPerPage: rowsPerPage }} wrapperClassName="max-h-[448px]" />
            <Modal
                title="Delete Confirmation"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                footerActions={[
                    { label: "Close", variant: "danger-soft", onPress: () => onOpenChange() },
                    { label: "Confirm", onPress: () => onDelete(category?.id) },
                ]}
            >
                <div className="flex items-center justify-center">
                    <div className="flex items-center justify-center rounded-full bg-[#FFECEC] p-3">
                        <TriangleAlert className="text-[#FF5F5F]" size={28} />
                    </div>
                </div>
                <p className="text-sm text-default-600"> Are you sure you want to delete this Category? <span className='font-semibold underline'>{category?.name}</span> </p>
            </Modal>
        </div>
    )
}

export default Table
