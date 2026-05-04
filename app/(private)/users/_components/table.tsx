"use client"
import React, { useState } from 'react'
import { Chip } from '@heroui/react';
import { ListChevronsUpDown, Pencil, Trash2, TriangleAlert } from 'lucide-react';

import Modal from '@/ui/modal';
import Search from '@/ui/search';
import { Column, DataTable } from '@/ui/data-table'



import useUserDelete from '@/hooks/use-user-delete';

import { UserListType } from '@/types/user/list';
import { UserFormType } from '@/types/user/form';


type Props = {
    data: UserListType[];
    onEdit: (user: UserFormType) => void;
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
    const { onDelete } = useUserDelete({ onOpenChange, onResetToAdd });

    // State to store the currently selected commission type for deletion or editing
    const [user, setUser] = useState<UserListType | undefined>();

    // Function to handle editing: calls parent prop function with selected commission type
    const handleEdit = (user: UserListType) => {
        const payload = {
            id: user.id,
            // type: user.type,
            role: user.roleId,
            name: user.name,
            email: user.email,
            mobileNumber: user.mobileNumber,
            branchId: user.branch?.id ?? "",
            password: user.password,
        }
        onEdit(payload)
    }

    // Function to handle delete action: opens the modal and sets selected commission type
    const handleDelete = (user: UserListType) => {
        onOpen();
        setUser(user);
    }

    const columns: Column<UserListType>[] = [
        {
            key: "srNo",
            label: "Sr. No",
            renderCell: (_, rowIndex) => (rowIndex ?? 0) + 1, // rowIndex starts at 0
        },
        { key: "roleId", label: "Role", renderCell: (value) => value.role?.name ?? "N/A" },
        // { key: "type", label: "Type" },
        { key: "name", label: "Full Name" },
        { key: "email", label: "Email" },
        { key: "mobileNumber", label: "Mobile No." },
        { key: "branchId", label: "Branch", renderCell: (value) => value.branch?.name ?? "N/A" },
        // { key: "password", label: "Password" },
        // {
        //     key: "isVerified", label: "Status", renderCell: (value) => (
        //         <Chip size='sm'
        //             className={
        //                 value.isVerified
        //                     ? "bg-chips-active text-chips-text-active dark:bg-chips-active-dark dark:text-chips-text-active-dark"
        //                     : "bg-chips-pending text-chips-text-pending dark:bg-chips-pending-dark dark:text-chips-text-pending-dark"
        //             } >{value.isVerified ? "Verified" : "Pending"}</Chip>
        //     )
        // },
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
                    <div className="rounded-lg bg-primary/10 text-primary  flex items-center justify-center aspect-square w-6 h-6 ">
                        <ListChevronsUpDown width={18} />
                    </div>
                    <h2 className='text-base font-medium'>Users List</h2>
                </div>
                {/* <Search /> */}
            </div>
            <DataTable columns={columns} data={data} pagination={{ page: page, totalPages: totalPages, rowsPerPage: rowsPerPage }} wrapperClassName="max-h-[400px]" />
            <Modal
                title="Delete Confirmation"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                footerActions={[
                    { label: "Close", variant: "danger-soft", onPress: () => onOpenChange() },
                    { label: "Confirm", onPress: () => onDelete(user?.id) },
                ]}
            >
                <div className="flex items-center justify-center">
                    <div className="flex items-center justify-center rounded-full bg-[#FFECEC] p-3">
                        <TriangleAlert className="text-[#FF5F5F]" size={28} />
                    </div>
                </div>
                <p className="text-sm text-default-600"> Are you sure you want to delete this user? <span className='font-semibold underline'>{user?.name}</span> </p>
            </Modal>
        </div>
    )
}

export default Table
