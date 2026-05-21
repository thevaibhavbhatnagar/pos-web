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
        <div className="grid sm:grid-cols-4 gap-4 w-full h-full">
            <ul className="col-span-1 flex flex-col gap-3 border bg-surface p-4 w-full rounded-2xl">
                <li
                    onClick={() => { router.push('/pos'); setCategory('ALL'); }}
                    className={`border p-3 rounded-xl cursor-pointer text-sm transition-all duration-300 ${category.toString() === 'ALL' ? 'font-semibold shadow-lg bg-[image:var(--sidebar-active-bg)] backdrop-blur-md border border-[var(--sidebar-active-border)] shadow-[inset_0px_1px_1px_var(--sidebar-active-highlight)] text-[var(--sidebar-active-text)] transform -translate-y-0.5 active:scale-[0.98]' : 'hover:bg-default-100'}`}
                >
                    <h3>All Categories</h3>
                </li>

                {categories.map((cat) => (
                    <li
                        key={cat.value}
                        onClick={() => {
                            router.push(`/pos?category_id=${cat.value}`);
                            setCategory(cat.value);
                        }}
                        className={`border p-3 rounded-xl cursor-pointer text-sm transition-all duration-300 ${cat.value === category ? 'font-semibold shadow-lg bg-[image:var(--sidebar-active-bg)] backdrop-blur-md border border-[var(--sidebar-active-border)] shadow-[inset_0px_1px_1px_var(--sidebar-active-highlight)] text-[var(--sidebar-active-text)] transform -translate-y-0.5 active:scale-[0.98]' : 'hover:bg-default-100'}`}
                    >
                        <h3>{cat.label}</h3>
                    </li>
                ))}
            </ul>

            <div className="w-full sm:col-span-2 bg-surface p-4 border rounded-2xl shadow-sm">
                <h2 className="text-lg font-semibold mb-4">
                    Products
                </h2>

                <div className="grid md:grid-cols-4 gap-3 w-full">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div
                                key={product.id}
                                className="border p-2.5 rounded-2xl flex flex-col justify-between hover:shadow-md transition-shadow bg-white"
                            >
                                <div>
                                    <div className="w-full h-24 relative mb-2 rounded-xl overflow-hidden bg-default-100 flex items-center justify-center">
                                        <Image
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            src={product.image || NoImage}
                                            alt={product.name}
                                            className="object-cover"
                                        />
                                    </div>
                                    <h3 className="font-medium text-sm line-clamp-2 leading-tight">{product.name}</h3>
                                </div>
                                <div className="flex justify-between items-center mt-3">
                                    <p className="font-semibold text-sm">₹{product.price}</p>

                                    <Button
                                        size="sm"
                                        className="w-14 rounded-xl text-xs h-7"
                                        onClick={() => addToCart(product)}
                                    >
                                        Add
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-4 py-8 text-center">
                            <p className="text-sm text-default-500">No Products Found</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="w-full col-span-1 bg-surface p-4 flex flex-col gap-4 border rounded-2xl shadow-sm">
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

                <div className="grid grid-cols-1 gap-3 w-full">
                    {items.length > 0 ? (
                        items.map((item) => (
                            <div
                                key={item.id}
                                className="border p-3 rounded-2xl bg-white shadow-sm"
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className="font-medium text-sm line-clamp-2 pr-2 leading-tight">{item.name}</h3>

                                    <Button
                                        className="rounded-full w-8 h-8 shrink-0 bg-danger-50 text-danger hover:bg-danger-100"
                                        onClick={() =>
                                            removeFromCart(item.id)
                                        }
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>

                                <div className="flex justify-between items-center mt-3">
                                    <p className="font-semibold text-sm">₹{item.price}</p>

                                    <div className="flex items-center gap-2">
                                        <Button
                                            className="rounded-full w-8 h-8 bg-default-100 text-default-600 hover:bg-default-200"
                                            onClick={() =>
                                                decreaseQuantity(item.id)
                                            }
                                        >
                                            <Minus className="w-4 h-4" />
                                        </Button>

                                        <span className="w-4 text-center text-sm font-medium">{item.quantity}</span>

                                        <Button
                                            className="rounded-full w-8 h-8 bg-default-100 text-default-600 hover:bg-default-200"
                                            onClick={() =>
                                                increaseQuantity(item.id)
                                            }
                                        >
                                            <Plus className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-8 text-center border border-dashed rounded-2xl">
                            <p className="text-sm text-default-500">No items in cart</p>
                        </div>
                    )}
                </div>

                <div className="flex justify-between items-center border-t mt-2 pt-4">
                    <p className="font-semibold text-lg">Total:</p>
                    <p className="font-bold text-lg">₹{total}</p>
                </div>

                <Button
                    size="lg"
                    className="mt-2 w-full rounded-xl text-md font-semibold"
                    onClick={() => {
                        if (items.length === 0) {
                            toast.warning("Please add at least one item");
                            return;
                        }

                        createOrder.mutate({
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
                        });
                    }}
                >
                    KOT & Print
                </Button>
            </div>

            {/* {JSON.stringify(items)} */}
        </div>
    );
};

export default Items;
