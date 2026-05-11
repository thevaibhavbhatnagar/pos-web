import { OrderFormValues } from '@/types/order/create';
import { OrderDetailsType } from '@/types/order/details';
import { ProductListType } from '@/types/product/list';
import Button from '@/ui/button';
import axiosInstance from '@/utils/axiosInstance';
import apiEndpoints from '@/utils/endpoints';
import { cn, toast } from '@heroui/react';
import { useMutation } from '@tanstack/react-query';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import NoImage from '../../../../../../public/assets/no-image.webp';

type Props = {
    order: OrderDetailsType;
    categories: { label: string; value: string }[];
    products: ProductListType[];
    id: string;
};

type CartItem = {
    id: string;
    name: string;
    price: number;
    category_id: string;
    quantity: number;
};

type ChipProps = {
    value: string;
    children: React.ReactNode;
    className?: string;
};

const Items: React.FC<Props> = ({ order, categories, products, id }) => {
    const router = useRouter();

    const [items, setItems] = useState<CartItem[]>([]);

    const [category, setCategory] = useState<string>('ALL');

    const addToCart = (product: ProductListType) => {
        setItems((prev) => {
            const existingItem = prev.find(
                (i) => i.id === product.id
            );

            if (existingItem) {
                return prev.map((i) =>
                    i.id === product.id
                        ? {
                            ...i,
                            quantity: i.quantity + 1,
                        }
                        : i
                );
            }

            return [
                ...prev,
                {
                    id: product.id,
                    name: product.name,
                    price: Number(product.price),
                    category_id: product.categoryId,
                    quantity: 1,
                },
            ];
        });
    };

    const removeFromCart = (id: string) => {
        setItems((prev) =>
            prev.filter((item) => item.id !== id)
        );
    };

    const increaseQuantity = (id: string) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                    }
                    : item
            )
        );
    };

    const decreaseQuantity = (id: string) => {
        setItems((prev) =>
            prev
                .map((item) =>
                    item.id === id
                        ? {
                            ...item,
                            quantity: item.quantity - 1,
                        }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const total = useMemo(() => {
        return items.reduce(
            (acc, item) =>
                acc + item.price * item.quantity,
            0
        );
    }, [items]);

    const { data } = useSession();
    const branchId = data?.user?.branchId;
    const userId = data?.user?.id;

    const updateOrder = useMutation({
        mutationFn: async (order: OrderFormValues) => {
            const payload = {
                branchId: order.branchId,
                userId: order.userId,


                discountAmount: order.discountAmount,
                paymentMethod: order.paymentMethod,
                taxAmount: order.taxAmount,

                notes: order.notes,

                items: order.items.map((item) => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.price,
                })),
            };

            const response = await axiosInstance.patch(
                `${apiEndpoints.order.update}/${id}`,
                payload
            );

            return response.data;
        },

        onSuccess: (data) => {
            toast.success(data.message);

            setTimeout(() => {
                router.replace("/kots");
            }, 1200);
        },


        onError: (error: any) => {
            toast.danger(
                error?.response?.data?.message ||
                'Something went wrong'
            );
        },
    });

    const statusStyles: Record<string, string> = {
        PENDING:
            "bg-[var(--chip-pending)] text-[var(--chip-pending-text)]",

        PREPARING:
            "bg-[var(--chip-inactive)] text-[var(--chip-inactive-text)]",

        READY:
            "bg-[var(--chip-active)] text-[var(--chip-active-text)]",

        SERVED:
            "bg-[var(--chip-active)] text-[var(--chip-active-text)]",

        CLOSED:
            "bg-[var(--chip-active)] text-[var(--chip-active-text)]",

        CANCELLED:
            "bg-[var(--chip-error)] text-[var(--chip-error-text)]",
    };

    const Chip = ({ className, ...props }: ChipProps) => {
        const colorClass =
            statusStyles[props.value] || statusStyles.PENDING;

        return (
            <div
                className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded text-[8px] uppercase font-bold tracking-wide",
                    "h-6",
                    colorClass,
                    className
                )}
            >
                {props.children}
            </div>
        );
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 mb-6 bg-white p-4 rounded-lg">
                <div className="flex items-center justify-between gap-4">
                    <p>Order</p>
                    <p>{order?.billNo}</p>
                    <Chip value={order?.status}>
                        {order?.status}
                    </Chip>
                </div>



            </div>
            <div className="grid grid-cols-4 gap-4 w-full h-full">
                <ul className="col-span-1 flex flex-col gap-4 border bg-surface p-4 w-full">
                    <li
                        onClick={() => { router.push('/pos'); setCategory('ALL'); }}
                        className={`border p-1.5 rounded cursor-pointer text-sm${category.toString() === 'ALL' ? 'font-semibold shadow-lg bg-[image:var(--sidebar-active-bg)] backdrop-blur-md border border-[var(--sidebar-active-border)] shadow-[inset_0px_1px_1px_var(--sidebar-active-highlight)] text-[var(--sidebar-active-text)]  hover:opacity-100 transform transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] ' : ''}`}
                    >
                        <h3>All Categories</h3>
                    </li>

                    {categories.map((cat) => (
                        <li
                            key={cat.value}
                            onClick={() => {
                                router.push(`/pos?category_id=${cat.value}`),
                                    setCategory(cat.value);
                            }
                            }
                            className={`border p-1.5 rounded cursor-pointer text-sm${cat.value === category ? 'font-semibold shadow-lg bg-[image:var(--sidebar-active-bg)] backdrop-blur-md border border-[var(--sidebar-active-border)] shadow-[inset_0px_1px_1px_var(--sidebar-active-highlight)] text-[var(--sidebar-active-text)]  hover:opacity-100 transform transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] ' : ''}`}
                        >
                            <h3>{cat.label}</h3>
                        </li>
                    ))}
                </ul>

                <div className="w-full col-span-2 bg-surface p-4">
                    <h2 className="text-lg font-semibold mb-4">
                        Products
                    </h2>

                    <div className="grid grid-cols-3 gap-4 w-full">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <div
                                    key={product.id}
                                    className="border shadow bg-surface p-2 rounded-lg"
                                >

                                    <Image
                                        width={50}
                                        height={50}
                                        src={product.image || NoImage}
                                        alt={product.name}
                                        className="w-full h-32 object-cover mb-2"
                                    />

                                    <h3>{product.name}</h3>
                                    <div className="flex justify-between items-center mt-2">
                                        <p>₹{product.price}</p>

                                        <Button
                                            className="mt-2 w-20"
                                            onClick={() => addToCart(product)}
                                        >
                                            Add
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>
                                <p>No Products Found</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="w-full col-span-1 flex flex-col gap-4">
                    <div className="flex flex-col gap-4 bg-surface p-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold">
                                Cart
                            </h2>

                            <Button
                                className="rounded-full w-8 h-8"
                                onClick={clearCart}
                            >
                                <Trash2 />
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 gap-4 w-full">
                            {items.length > 0 ? (
                                items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="border p-2 rounded"
                                    >
                                        <div className="flex justify-between items-center mt-2">
                                            <h3>{item.name}</h3>

                                            <Button
                                                className="rounded-full w-8 h-8"
                                                onClick={() =>
                                                    removeFromCart(item.id)
                                                }
                                            >
                                                <Trash2 />
                                            </Button>
                                        </div>

                                        <div className="flex justify-between items-center mt-2">
                                            <p>₹{item.price}</p>

                                            <div className="flex items-center gap-2">
                                                <Button
                                                    className="rounded-full w-8 h-8"
                                                    onClick={() =>
                                                        decreaseQuantity(item.id)
                                                    }
                                                >
                                                    <Minus />
                                                </Button>

                                                <span>{item.quantity}</span>

                                                <Button
                                                    className="rounded-full w-8 h-8"
                                                    onClick={() =>
                                                        increaseQuantity(item.id)
                                                    }
                                                >
                                                    <Plus />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div>
                                    <p>No items in cart</p>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between items-center border-t mt-2 pt-2">
                            <p className="font-medium">Total:</p>
                            <p className="font-medium">₹{total}</p>
                        </div>

                        <Button className="mt-2 w-full" onClick={() =>
                            updateOrder.mutate({
                                branchId: branchId || '',
                                userId: userId || '',

                                discountAmount: 0,
                                taxAmount: 0,
                                paymentMethod: "CASH",

                                items: items.map((item) => ({
                                    productId: item.id,
                                    quantity: item.quantity,
                                    price: item.price,
                                })),
                            })
                        }>
                            {updateOrder.isPending ? 'Creating KOT...' : 'KOT & Print'}
                        </Button>
                    </div>
                    <div className="flex flex-col gap-4 bg-surface p-4">
                        <h2 className="flex items-center gap-2">
                            <p className='text-lg font-semibold'> Previous KOTs </p>
                            <span className="text-sm font-light text-gray-400">(Same Order)</span>
                        </h2>

                        <div className="grid grid-cols-1 gap-4 w-full">
                            {order?.kots?.length > 0 ? (
                                order.kots.map((kot, index) =>
                                    <div key={kot.id} className="bg-gray-100 p-2 rounded-lg">
                                        <div className="flex justify-between items-center">
                                            <p className='text-sm font-semibold'>KOT #{index + 1}</p>
                                            <p className={`text-xs font-light ${statusStyles[kot.status]}`}>{kot.status}</p>
                                        </div>
                                        <div className="flex justify-between"><div>Items</div> <div>Qty.</div> </div>

                                        {kot.items.map((item) => (
                                            <div
                                                key={item.id}
                                                className=""
                                            >
                                                <div className="flex justify-between items-center mt-2">
                                                    <h3>{item.product.name}</h3>
                                                    <p>{item.quantity}</p>
                                                </div>

                                                <div className="flex justify-between items-center mt-2">
                                                    {/* <p>Qty: {item.quantity}</p> */}
                                                    {/* <p>₹{item.product.price}</p> */}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )
                            ) : (
                                <div>
                                    <p>No items in cart</p>
                                </div>
                            )}
                        </div>

                        <Button className="mt-2 w-full" onClick={()=>router.push("/kots")} >
                            View All KOTs
                        </Button>

                    </div>
                </div>

                {/* {JSON.stringify(items)} */}
            </div>
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
  <div className="flex items-center justify-between border-b border-dashed pb-3">
    <div>
      <h3 className="text-lg font-semibold text-gray-800">
        Order Summary
      </h3>
      <p className="text-sm text-gray-500">
        Updated billing overview
      </p>
    </div>

    <div className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
      Updated
    </div>
  </div>

  <div className="mt-4 space-y-4">
    <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
      <p className="text-sm font-medium text-gray-600">
        Previous Total
      </p>

      <p className="text-base font-semibold text-gray-800">
        ₹{Number(order?.totalAmount || 0).toFixed(2)}
      </p>
    </div>

    <div className="flex items-center justify-between rounded-xl bg-blue-50 px-4 py-3">
      <p className="text-sm font-medium text-blue-700">
        New Items Total
      </p>

      <p className="text-base font-semibold text-blue-800">
        ₹{total.toFixed(2)}
      </p>
    </div>

    <div className="border-t pt-4">
      <div className="flex items-center justify-between rounded-xl bg-green-50 px-4 py-4">
        <div>
          <p className="text-sm text-green-700">
            Final Total Amount
          </p>

          <p className="text-xs text-green-600">
            Including newly added items
          </p>
        </div>

        <p className="text-2xl font-bold text-green-700">
          ₹
          {(Number(order?.totalAmount || 0) + total).toFixed(2)}
        </p>
      </div>
    </div>
  </div>
</div>
        </div>
    );
};

export default Items;
