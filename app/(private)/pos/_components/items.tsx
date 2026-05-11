import { OrderFormValues } from '@/types/order/create';
import { ProductListType } from '@/types/product/list';
import Button from '@/ui/button';
import axiosInstance from '@/utils/axiosInstance';
import apiEndpoints from '@/utils/endpoints';
import { toast } from '@heroui/react';
import { useMutation } from '@tanstack/react-query';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import NoImage from '../../../../public/assets/no-image.webp'; 

type Props = {
    categories: { label: string; value: string }[];
    products: ProductListType[];
};

type CartItem = {
    id: string;
    name: string;
    price: number;
    category_id: string;
    quantity: number;
};

const Items: React.FC<Props> = ({ categories, products }) => {
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

    const createOrder = useMutation({
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

            const response = await axiosInstance.post(
                apiEndpoints.order.create,
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

    return (
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
                                className="border p-2 rounded"
                            >
                                <h3>{product.name}</h3>

                                <Image
                                    width={50}
                                    height={50}
                                    src={product.image || NoImage}
                                    alt={product.name}
                                    className="w-full h-32 object-cover mb-2"
                                />

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

            <div className="w-full col-span-1 bg-surface p-4 flex flex-col gap-4">
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
                    createOrder.mutate({
                        branchId: branchId || '',
                        userId: userId || '',

                        discountAmount: 0,
                        taxAmount: 0,
                        paymentMethod:"CASH",

                        items: items.map((item) => ({
                            productId: item.id,
                            quantity: item.quantity,
                            price: item.price,
                        })),
                    })
                }>
                    KOT & Print
                </Button>
            </div>

            {/* {JSON.stringify(items)} */}
        </div>
    );
};

export default Items;
