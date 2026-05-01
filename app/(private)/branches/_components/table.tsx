"use client"
import React, { useState } from 'react'

import Modal from '@/ui/modal';
import Search from '@/ui/search';
import { Column, DataTable } from '@/ui/data-table'


import { ListChevronsUpDown, Pencil, Trash2 } from 'lucide-react';

import { BranchFormType } from '@/types/branch/form';
import { BranchListType } from '@/types/branch/list';
import useBranchDelete from '@/hooks/use-branch-delete';


type Props = {
    data: BranchListType[];
    onEdit: (branch: BranchFormType) => void;
    onResetToAdd: () => void;
    page: number;
    totalPages: number;
    rowsPerPage: number;
}

const Table: React.FC<Props> = ({ data, onEdit, onResetToAdd, page, totalPages, rowsPerPage }) => {

    const [isOpen, setIsOpen] = useState(false);

    const onOpen = () => setIsOpen(true);
    const onOpenChange = () => setIsOpen(false);

    // Custom hook to handle deletion of a branch
    const { onDelete } = useBranchDelete({ onOpenChange, onResetToAdd });

    // State to store the currently selected branch for deletion or editing
    const [branch, setBranch] = useState<BranchListType | undefined>();

    // Function to handle editing: calls parent prop function with selected branch
    const handleEdit = (branch: BranchListType) => {
        const payload: BranchFormType = {
            id: branch.id,
            name: branch.name,
        }
        onEdit(payload)
    }

    // Function to handle delete action: opens the modal and sets selected branch
    const handleDelete = (branch: BranchListType) => {
        onOpen();
        setBranch(branch);
    }

    const columns: Column<BranchListType>[] = [
        {
            key: "srNo",
            label: "Sr. No",
            renderCell: (_, rowIndex) => (rowIndex ?? 0) + 1, // rowIndex starts at 0
        },
        { key: "name", label: "Branch Name" },
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
        <div className='py-3 rounded-lg w-full h-full bg-surface'>
            <div className="flex flex-col md:flex-row gap-2 md:gap-0 w-full justify-between px-3 mb-2">
                <div className="flex gap-2 items-center">
                    <div className="rounded-lg bg-primary/10 text-primary flex items-center justify-center aspect-square w-6 h-6 ">
                        <ListChevronsUpDown width={18} />
                    </div>
                    <h2 className='text-base font-medium'>Branches List</h2>
                </div>
                <Search />
            </div>
            <DataTable columns={columns} data={data} pagination={{ page: page, totalPages: totalPages, rowsPerPage: rowsPerPage }} wrapperClassName="max-h-[400px]" />
            <Modal
                title="Delete Confirmation"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                footerActions={[
                    { label: "Close",radius: "sm", variant: "danger-soft", onPress: () => onOpenChange() },
                    { label: "Confirm", radius: "sm",  onPress: () => onDelete(branch?.id) },
                ]}
                size='sm'
            >

                <p className="text-sm text-default-600"> Are you sure you want to delete this branch? <span className='font-semibold underline'>{branch?.name}</span> </p>
            </Modal>
        </div>
    )
}

export default Table
