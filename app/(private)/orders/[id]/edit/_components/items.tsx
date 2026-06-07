import { OrderFormValues } from '@/types/order/create';
import { OrderDetailsType } from '@/types/order/details';
import { ProductListType } from '@/types/product/list';
import Button from '@/ui/button';
import Modal from '@/ui/modal';
import axiosInstance from '@/utils/axiosInstance';
import apiEndpoints from '@/utils/endpoints';
import { cn, Checkbox, toast } from '@heroui/react';
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
    id: string; // Composite unique key: productId + '-' + addonIds.sort().join(',')
    productId: string;
    name: string;
    price: number; // base price + selected addon prices
    basePrice: number;
    category_id: string;
    quantity: number;
    addonIds?: string[];
    selectedAddons?: { id: string; name: string; price: number }[];
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

    // States for addons selection modal
    const [isAddonModalOpen, setIsAddonModalOpen] = useState(false);
    const [activeProduct, setActiveProduct] = useState<ProductListType | null>(null);
    const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);

    const addToCart = (product: ProductListType) => {
        if (product.productAddons && product.productAddons.length > 0) {
            setActiveProduct(product);
            setSelectedAddonIds([]);
            setIsAddonModalOpen(true);
        } else {
            handleAddToCartConfirm(product, []);
        }
    };

    const handleAddToCartConfirm = (product: ProductListType, addonIds: string[]) => {
        const sortedAddonIds = [...addonIds].sort();
        const addonKey = sortedAddonIds.join(',');
        const cartItemId = addonKey ? `${product.id}-${addonKey}` : product.id;

        const normalizedAddons = product.productAddons
            ? product.productAddons.map((pa: any) => pa.addon || pa)
            : [];

        const selectedAddonsInfo = normalizedAddons.filter((a) => sortedAddonIds.includes(a.id));

        const addonsPrice = selectedAddonsInfo.reduce((sum, a) => sum + Number(a.price), 0);
        const finalPrice = Number(product.price) + addonsPrice;

        setItems((prev) => {
            const existingItem = prev.find((i) => i.id === cartItemId);

            if (existingItem) {
                return prev.map((i) =>
                    i.id === cartItemId
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
                    id: cartItemId,
                    productId: product.id,
                    name: product.name,
                    price: finalPrice,
                    basePrice: Number(product.price),
                    category_id: product.categoryId,
                    quantity: 1,
                    addonIds: sortedAddonIds,
                    selectedAddons: selectedAddonsInfo.map((a) => ({
                        id: a.id,
                        name: a.name,
                        price: Number(a.price),
                    })),
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
                    addonIds: item.addonIds,
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
            <div className="grid grid-cols-1 md:grid-cols-4  gap-4 w-full h-full">
                <ul className="col-span-1 flex flex-col gap-3 border bg-surface p-4 w-full rounded-2xl">
                    <li
                        onClick={() => { router.push(`/orders/${id}/edit`); setCategory('ALL'); }}
                        className={`border p-3 rounded-xl cursor-pointer text-sm transition-all duration-300 ${category.toString() === 'ALL' ? 'font-semibold shadow-lg bg-[image:var(--sidebar-active-bg)] backdrop-blur-md border border-[var(--sidebar-active-border)] shadow-[inset_0px_1px_1px_var(--sidebar-active-highlight)] text-[var(--sidebar-active-text)] transform -translate-y-0.5 active:scale-[0.98]' : 'hover:bg-default-100'}`}
                    >
                        <h3>All Categories</h3>
                    </li>

                    {categories.map((cat) => (
                        <li
                            key={cat.value}
                            onClick={() => {
                                router.push(`/orders/${id}/edit?category_id=${cat.value}`);
                                setCategory(cat.value);
                            }}
                            className={`border p-3 rounded-xl cursor-pointer text-sm transition-all duration-300 ${cat.value === category ? 'font-semibold shadow-lg bg-[image:var(--sidebar-active-bg)] backdrop-blur-md border border-[var(--sidebar-active-border)] shadow-[inset_0px_1px_1px_var(--sidebar-active-highlight)] text-[var(--sidebar-active-text)] transform -translate-y-0.5 active:scale-[0.98]' : 'hover:bg-default-100'}`}
                        >
                            <h3>{cat.label}</h3>
                        </li>
                    ))}
                </ul>

                <div className="w-full col-span-2 bg-surface p-4 border rounded-2xl shadow-sm">
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

                <div className="w-full col-span-1 flex flex-col gap-4">
                    <div className="flex flex-col gap-4 bg-surface p-4 border rounded-2xl shadow-sm">
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
                                            <div>
                                                <h3 className="font-medium text-sm line-clamp-2 pr-2 leading-tight">{item.name}</h3>
                                                {item.selectedAddons && item.selectedAddons.length > 0 && (
                                                    <div className="flex flex-wrap gap-1 mt-1.5">
                                                        {item.selectedAddons.map((addon) => (
                                                            <span
                                                                key={addon.id}
                                                                className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary/10 text-primary border border-primary/20"
                                                            >
                                                                +{addon.name} (₹{addon.price})
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

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

                        <Button size="lg" className="mt-2 w-full rounded-xl text-md font-semibold" onClick={() => {
                            if (items.length === 0) {
                                toast.warning("Please add at least one item");
                                return;
                            }
                            updateOrder.mutate({
                                branchId: branchId || '',
                                userId: userId || '',

                                discountAmount: 0,
                                taxAmount: 0,
                                paymentMethod: "CASH",

                                items: items.map((item) => ({
                                    productId: item.productId,
                                    quantity: item.quantity,
                                    price: item.basePrice,
                                    addonIds: item.addonIds || [],
                                })),
                            })
                        }}>
                            {updateOrder.isPending ? 'Creating KOT...' : 'KOT & Print'}
                        </Button>
                    </div>
                    <div className="flex flex-col gap-4 bg-surface p-4 border rounded-2xl shadow-sm mb-4">
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

                        <Button className="mt-2 w-full" onClick={() => router.push("/kots")} >
                            View All KOTs
                        </Button>

                    </div>
                </div>

                {/* {JSON.stringify(items)} */}
            </div>

            <Modal
                title={`Addons for ${activeProduct?.name ?? ''}`}
                isOpen={isAddonModalOpen}
                onOpenChange={setIsAddonModalOpen}
                footerActions={[
                    {
                        label: 'Cancel',
                        variant: 'danger-soft',
                        onPress: () => {
                            setIsAddonModalOpen(false);
                            setActiveProduct(null);
                            setSelectedAddonIds([]);
                        },
                    },
                    {
                        label: 'Add to Cart',
                        onPress: () => {
                            if (activeProduct) {
                                handleAddToCartConfirm(activeProduct, selectedAddonIds);
                            }
                            setIsAddonModalOpen(false);
                            setActiveProduct(null);
                            setSelectedAddonIds([]);
                        },
                    },
                ]}
            >
                <div className="flex flex-col gap-4 py-2">
                    <p className="text-sm text-default-500">
                        Select optional addons for this product.
                    </p>
                    <div className="flex flex-col gap-2.5 max-h-[300px] overflow-y-auto pr-1">
                        {(() => {
                            const normalizedAddons = activeProduct?.productAddons
                                ? activeProduct.productAddons.map((pa: any) => pa.addon || pa)
                                : [];

                            return normalizedAddons.map((addon) => {
                                const isSelected = selectedAddonIds.includes(addon.id);
                                return (
                                    <div
                                        key={addon.id}
                                        onClick={() => {
                                            setSelectedAddonIds((prev) =>
                                                prev.includes(addon.id)
                                                    ? prev.filter((id) => id !== addon.id)
                                                    : [...prev, addon.id]
                                            );
                                        }}
                                        className={`flex justify-between items-center p-3 rounded-xl border cursor-pointer transition-all duration-200 select-none ${
                                            isSelected
                                                ? 'border-primary bg-primary/5 shadow-sm'
                                                : 'border-default-200 hover:bg-default-50'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="pointer-events-none">
                                                <Checkbox isSelected={isSelected}>
                                                    <Checkbox.Control>
                                                        <Checkbox.Indicator />
                                                    </Checkbox.Control>
                                                </Checkbox>
                                            </div>
                                            <span className="font-medium text-sm text-default-800">
                                                {addon.name}
                                            </span>
                                        </div>
                                        <span className="text-sm font-semibold text-primary">
                                            + ₹{addon.price}
                                        </span>
                                    </div>
                                );
                            });
                        })()}
                    </div>

                    <div className="border-t pt-3 mt-2 flex justify-between items-center">
                        <span className="text-sm font-medium text-default-600">Total Price:</span>
                        <span className="text-lg font-bold text-default-900">
                            ₹
                            {(
                                Number(activeProduct?.price || 0) +
                                (activeProduct?.productAddons
                                    ? activeProduct.productAddons.map((pa: any) => pa.addon || pa)
                                    : [])
                                    .filter((a) => selectedAddonIds.includes(a.id))
                                    .reduce((sum, a) => sum + Number(a.price), 0)
                            ).toFixed(2)}
                        </span>
                    </div>
                </div>
            </Modal>
            <div className="sticky bottom-4 z-40 mt-auto rounded-2xl border border-gray-200 bg-white/90 p-3 shadow-2xl backdrop-blur-md">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <h3 className="text-base font-semibold text-gray-800">Order Summary</h3>
                            <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-medium text-green-700">Updated</span>
                        </div>
                        <p className="text-xs text-gray-500">Billing overview</p>
                    </div>

                    <div className="flex items-center gap-4 md:gap-6">
                        <div className="flex flex-col items-end">
                            <p className="text-xs font-medium text-gray-500">Previous</p>
                            <p className="text-sm font-semibold text-gray-800">₹{Number(order?.totalAmount || 0).toFixed(2)}</p>
                        </div>

                        <div className="text-gray-300 font-light">+</div>

                        <div className="flex flex-col items-end">
                            <p className="text-xs font-medium text-blue-500">New Items</p>
                            <p className="text-sm font-semibold text-blue-700">₹{total.toFixed(2)}</p>
                        </div>

                        <div className="text-gray-300 font-light">=</div>

                        <div className="flex flex-col items-end rounded-xl bg-green-50 px-4 py-2 border border-green-100">
                            <p className="text-xs font-semibold text-green-700">Final Total</p>
                            <p className="text-lg font-bold text-green-700">₹{(Number(order?.totalAmount || 0) + total).toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Items;
