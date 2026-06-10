"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { Chip } from '@heroui/react';
import { ListChevronsUpDown, Pencil, Trash2, TriangleAlert } from 'lucide-react';

import Modal from '@/ui/modal';
import { Column, DataTable } from '@/ui/data-table'

import useOrderDelete from '@/hooks/use-order-delete';

import { OrderListType } from '@/types/order/list'; 
import { formatDate } from '@/utils/dateConvert';


type Props = {
    data: OrderListType[];
    page: number;
    totalPages: number;
    rowsPerPage: number;
    totalItems?: number;
}

const Table: React.FC<Props> = ({ data, page, totalPages, rowsPerPage, totalItems }) => {

    // Hook from Hero UI to manage modal open/close state

    const [isOpen, setIsOpen] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    const openPaymentModal = () => setIsPaymentModalOpen(true);
    const onPaymentModalChange = () =>  setIsPaymentModalOpen(false);

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
        { key: "paymentMethod", label: "Payment Method", renderCell: (value) => <Chip className='capitalize'>{value.paymentMethod ? value.paymentMethod : "N/A"}</Chip> },
        {
            key: "status",
            label: "Status",
            renderCell: (value) => {
                const orderStatusStyles: Record<string, string> = {
                    PENDING:
                        "bg-[var(--chip-pending)] text-[var(--chip-pending-text)]",

                    PREPARING:
                        "bg-[var(--chip-preparing)] text-[var(--chip-preparing-text)]",

                    READY:
                        "bg-[var(--chip-ready)] text-[var(--chip-ready-text)]",

                    SERVED:
                        "bg-[var(--chip-served)] text-[var(--chip-served-text)]",

                    COMPLETED:
                        "bg-[var(--chip-active)] text-[var(--chip-active-text)]",

                    CANCELLED:
                        "bg-[var(--chip-inactive)] text-[var(--chip-inactive-text)]",
                };

                return (
                    <Chip
                        size="sm"
                        className={`border-0 capitalize font-medium ${orderStatusStyles[value.status] || ""}`}
                    >
                        {value.status.toLowerCase()}
                    </Chip>
                );
            },
        },
        {
            key: "paymentStatus",
            label: "Payment Status",
            renderCell: (value) => {
                const paymentStatusStyles: Record<string, string> = {
                    PENDING:
                        "bg-[var(--chip-pending)] text-[var(--chip-pending-text)]",

                    PAID:
                        "bg-[var(--chip-active)] text-[var(--chip-active-text)]",

                    PARTIAL:
                        "bg-[var(--chip-preparing)] text-[var(--chip-preparing-text)]",

                    REFUNDED:
                        "bg-[var(--chip-inactive)] text-[var(--chip-inactive-text)]",
                };

                return (
                    <Chip
                        size="sm"
                        className={`border-0 capitalize font-medium ${paymentStatusStyles[value.paymentStatus] || ""}`}
                    >
                        {value.paymentStatus.toLowerCase()}
                    </Chip>
                );
            },
        },
        { key: "createdAt", label: "Created At", renderCell:(value)=>formatDate(value.createdAt) },
        { key: "updatedAt", label: "Updated At", renderCell:(value)=>formatDate(value.updatedAt) },

        {
            key: "action",
            label: "Action",

            renderCell: (value) => (
                <div className="flex items-center gap-2">

                    {/* PAYMENT */}
                    {value.status === "COMPLETED" &&
                        value.paymentStatus === "PENDING" && (
                            <button
                                onClick={openPaymentModal}
                                className="rounded-md px-2 py-1 text-sm text-primary hover:bg-primary/10 transition"
                            >
                                Pay Now
                            </button>
                        )}

                    {/* EDIT + DELETE ONLY WHEN PENDING */}
                    {value.status === "PENDING" && (
                        <>
                            {/* EDIT */}
                            <button
                                onClick={() =>
                                    router.push(`/orders/${value.id}/edit`)
                                }
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
                        </>
                    )}
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
            </div>
            <DataTable columns={columns} data={data} pagination={{ page: page, totalPages: totalPages, rowsPerPage: rowsPerPage, totalItems: totalItems }} />
            <Modal
                title="Delete Confirmation"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                footerActions={[
                    { label: "Close", variant: "danger", onPress: () => onOpenChange() },
                    { label: "Confirm", variant: "primary", onPress: () => onDelete(order?.id) },
                ]}
            >
                <div className="flex items-center justify-center">
                    <div className="flex items-center justify-center rounded-full bg-[#FFECEC] p-3">
                        <TriangleAlert className="text-[#FF5F5F]" size={28} />
                    </div>
                </div>
                <p className="text-sm text-default-600"> Are you sure you want to delete this order? <span className='font-semibold underline'>{order?.id}</span> </p>
            </Modal>
            {/* Payment Modal */}
            <Modal
                title="Payment Confirmation"
                isOpen={isPaymentModalOpen}
                onOpenChange={onPaymentModalChange}
                footerActions={[
                    {
                        label: "Cancel",
                        variant: "danger",
                        onPress: () => onPaymentModalChange(),
                    },
                    {
                        label: "Confirm Payment",
                        variant: "primary",
                        onPress: () => {
                            console.log("Payment Confirmed");
                            onPaymentModalChange();
                        },
                    },
                ]}
            >
                <div className="flex items-center justify-center">
                    <div className="flex items-center justify-center rounded-full bg-primary/10 p-3">
                        <TriangleAlert className="text-primary" size={28} />
                    </div>
                </div>

                <div className="flex flex-col gap-2 text-center">
                    <p className="text-sm text-default-600">
                        Are you sure you want to confirm payment for order
                        <span className="font-semibold underline ml-1">
                            {order?.billNo}
                        </span>
                        ?
                    </p>

                    <p className="text-xs text-default-400">
                        This action will mark the payment as paid.
                    </p>
                </div>
            </Modal>
        </div>
    )
}

export default Table
