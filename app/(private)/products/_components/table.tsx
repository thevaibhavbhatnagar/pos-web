"use client"
import React, { useState } from 'react'
import { Chip } from '@heroui/react';
import { ListChevronsUpDown, Pencil, Trash2, TriangleAlert } from 'lucide-react';

import Modal from '@/ui/modal';

import { Column, DataTable } from '@/ui/data-table'

import { ProductListType } from '@/types/product/list';
import { ProductFormType } from '@/types/product/form';
import useProductDelete from '@/hooks/use-product-delete';
import Image from 'next/image';


import NoImage from '../../../../public/assets/no-image.webp';

type Props = {
    data: ProductListType[];
    onEdit: (user: ProductFormType) => void;
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

    // Custom hook to handle deletion of a commission type
    const { onDelete } = useProductDelete({ onOpenChange, onResetToAdd });

    // State to store the currently selected commission type for deletion or editing
    const [product, setProduct] = useState<ProductListType | undefined>();

    // Function to handle editing: calls parent prop function with selected commission type
    const handleEdit = (data: ProductListType) => {
        const payload = {
            id: data.id,
            name: data.name,
            image: data.image,
            price: data.price,
            isKotRequired: data.isKotRequired.toString(),
            categoryId: data.categoryId,
            isActive: data.isActive.toString(),
            addonIds: data.productAddons ? data.productAddons.map((pa: any) => pa.id).filter(Boolean) : [],
        }
        onEdit(payload)
    }

    // Function to handle delete action: opens the modal and sets selected commission type
    const handleDelete = (user: ProductListType) => {
        onOpen();
        setProduct(user);
    }

    const columns: Column<ProductListType>[] = [
        {
            key: "srNo",
            label: "Sr. No",
            renderCell: (_, rowIndex) => (rowIndex ?? 0) + 1, // rowIndex starts at 0
        },
        { key: "name", label: "Name", renderCell: (value) => value?.name ?? "N/A" },
        { key: "image", label: "Image", renderCell: (value) => <Image className='p-2' width={50} height={50} src={value?.image ?? NoImage} alt={value?.name} /> },
        { key: "price", label: "Price", renderCell: (value) => value?.price ?? "N/A" },
        { key: "category", label: "Category", renderCell: (value) => value?.category.name ?? "N/A" },
        {
            key: "productAddons",
            label: "Addons",
            renderCell: (value) => {
                const addons = value?.productAddons || [];
                if (addons.length === 0) return "N/A";
                return (
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {addons.map((pa) => (
                            <Chip key={pa.id} size="sm" className="bg-primary/10 text-primary">
                                {pa.name}
                            </Chip>
                        ))}
                    </div>
                );
            }
        },
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
                    <h2 className='text-base font-medium'>Products List</h2>
                </div>
                {/* <Search /> */}
            </div>
            <DataTable columns={columns} data={data} pagination={{ page: page, totalPages: totalPages, rowsPerPage: rowsPerPage, totalItems: totalItems }} wrapperClassName="max-h-[400px]" />
            <Modal
                title="Delete Confirmation"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                footerActions={[
                    { label: "Close", variant: "danger-soft", onPress: () => onOpenChange() },
                    { label: "Confirm", onPress: () => onDelete(product?.id) },
                ]}
            >
                <div className="flex items-center justify-center">
                    <div className="flex items-center justify-center rounded-full bg-[#FFECEC] p-3">
                        <TriangleAlert className="text-[#FF5F5F]" size={28} />
                    </div>
                </div>
                <p className="text-sm text-default-600"> Are you sure you want to delete this Product? <span className='font-semibold underline'>{product?.name}</span> </p>
            </Modal>
        </div>
    )
}

export default Table
