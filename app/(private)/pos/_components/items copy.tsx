// import { ProductListType } from '@/types/product/list';
// import Button from '@/ui/button';
// import { Minus, Plus, Trash2 } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import React, { useState } from 'react'

// type Props = {
//     categories: { label: string; value: string }[];
//     products: ProductListType[];
// }

// const Items: React.FC<Props> = ({ categories, products }) => {
//     const router = useRouter();

//     const [items, setItems] = useState<{ id: string, name: string, price: string, category_id: string, quantity: number }[]>([]);
//     return (
//         <div className='grid grid-cols-4 gap-4 w-full h-full'>

//             <ul className="col-span-1 flex flex-col gap-4 border bg-surface p-4 w-full">
//                 <li onClick={() => router.push(`/pos`)} className='border p-2 rounded cursor-pointer'>
//                     <h3>All Categories</h3>
//                 </li>
//                 {categories?.map((category) => (
//                     <li key={category.value} onClick={() => router.push(`/pos?category_id=${category.value}`)} className='border p-2 rounded cursor-pointer'>
//                         <h3>{category.label}</h3>
//                     </li>
//                 ))}
//             </ul>
//             <div className="w-full col-span-2 bg-surface p-4">
//                 <h2>Products</h2>
//                 <div className="grid grid-cols-3 gap-4 w-full">
//                     {products?.length > 0 ? products?.map((product) => (
//                         <div key={product.id} className='border p-2 rounded'>
//                             <h3>{product.name}</h3>
//                             <div className="flex justify-between items-center mt-2">
//                                 <p>₹{product.price}</p>
//                                 <Button
//                                     className="mt-2 w-20"
//                                     onClick={() => {
//                                         const existingItem = items.find(
//                                             (i) => i.id === product.id
//                                         );

//                                         if (existingItem) {
//                                             setItems(
//                                                 items.map((i) =>
//                                                     i.id === product.id
//                                                         ? {
//                                                             ...i,
//                                                             quantity: i.quantity + 1,
//                                                         }
//                                                         : i
//                                                 )
//                                             );
//                                         } else {
//                                             setItems([
//                                                 ...items,
//                                                 {
//                                                     id: product.id,
//                                                     name: product.name,
//                                                     price: product.price,
//                                                     category_id: product.categoryId,
//                                                     quantity: 1,
//                                                 },
//                                             ]);
//                                         }
//                                     }}
//                                 >
//                                     Add
//                                 </Button></div>
//                         </div>
//                     )) : <div className=""><p>No Products Found</p></div>}
//                 </div>
//             </div>
//             <div className="w-full col-span-1 bg-surface p-4 flex flex-col gap-4">
//                 <div className="flex justify-between items-center">
//                     <h2>Cart</h2>
//                     <Button
//                         className="rounded-full w-8 h-8"
//                         onClick={() => {
//                             setItems([]);
//                         }}
//                     >
//                         <Trash2 />
//                     </Button>
//                 </div>
//                 <div className="grid grid-cols-1 gap-4 w-full">
//                     {items?.length > 0 ? items?.map((item) => (
//                         <div key={item.id} className='border p-2 rounded'>
//                             <div className="flex justify-between items-center mt-2">
//                                 <h3>{item.name}</h3>
//                                 <Button
//                                     className="rounded-full w-8 h-8"
//                                     onClick={() => {
//                                         setItems(items.filter((i) => i.id !== item.id));
//                                     }}
//                                 >
//                                     <Trash2 />
//                                 </Button>
//                             </div>
//                             <div className="flex justify-between items-center mt-2">
//                                 <p>₹{item.price}</p>
//                                 <div className="flex items-center">
//                                     <Button
//                                         className="rounded-full w-8 h-8"
//                                         onClick={() =>
//                                             setItems(
//                                                 items.map((i) =>
//                                                     i.id === item.id
//                                                         ? { ...i, quantity: i.quantity - 1 }
//                                                         : i
//                                                 )
//                                             )
//                                         }
//                                     >
//                                         <Minus />
//                                     </Button>
//                                     <span className="mx-2">{item.quantity}</span>
//                                     <Button
//                                         className="rounded-full w-8 h-8"
//                                         onClick={() =>
//                                             setItems(
//                                                 items.map((i) =>
//                                                     i.id === item.id
//                                                         ? { ...i, quantity: i.quantity + 1 }
//                                                         : i
//                                                 )
//                                             )
//                                         }
//                                     >
//                                         <Plus />
//                                     </Button>
//                                 </div> </div>

//                         </div>
//                     )) : <div className=""><p>No items in cart</p></div>}
//                 </div>
//                 <div className="flex justify-between items-center border-t mt-2 pt-2">
//                     <p className='font-medium'>Total: </p>
//                     <p className='font-medium'>₹{items?.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0)}</p>
//                 </div>
//                 <Button className="mt-2 w-full">Pay</Button>
//             </div>
//         </div>
//     )
// }

// export default Items

import { ProductListType } from '@/types/product/list';
import Button from '@/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react';

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

  return (
    <div className="grid grid-cols-4 gap-4 w-full h-full">
      <ul className="col-span-1 flex flex-col gap-4 border bg-surface p-4 w-full">
        <li
          onClick={() => {router.push('/pos');setCategory('ALL');}}
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

        <Button className="mt-2 w-full">
          Pay
        </Button>
      </div>

      {JSON.stringify(items)}
    </div>
  );
};

export default Items;


// import { ProductListType } from '@/types/product/list';
// import Button from '@/ui/button';
// import {
//   Minus,
//   Package,
//   Plus,
//   ShoppingCart,
//   Trash2,
// } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import React, { useMemo, useState } from 'react';

// type Props = {
//   categories: { label: string; value: string }[];
//   products: ProductListType[];
// };

// type CartItem = {
//   id: string;
//   name: string;
//   price: number;
//   category_id: string;
//   quantity: number;
// };

// const Items: React.FC<Props> = ({
//   categories,
//   products,
// }) => {
//   const router = useRouter();

//   const [items, setItems] = useState<CartItem[]>(
//     []
//   );

//   const addToCart = (
//     product: ProductListType
//   ) => {
//     setItems((prev) => {
//       const existingItem = prev.find(
//         (i) => i.id === product.id
//       );

//       if (existingItem) {
//         return prev.map((i) =>
//           i.id === product.id
//             ? {
//                 ...i,
//                 quantity: i.quantity + 1,
//               }
//             : i
//         );
//       }

//       return [
//         ...prev,
//         {
//           id: product.id,
//           name: product.name,
//           price: Number(product.price),
//           category_id: product.categoryId,
//           quantity: 1,
//         },
//       ];
//     });
//   };

//   const removeFromCart = (id: string) => {
//     setItems((prev) =>
//       prev.filter((item) => item.id !== id)
//     );
//   };

//   const increaseQuantity = (id: string) => {
//     setItems((prev) =>
//       prev.map((item) =>
//         item.id === id
//           ? {
//               ...item,
//               quantity: item.quantity + 1,
//             }
//           : item
//       )
//     );
//   };

//   const decreaseQuantity = (id: string) => {
//     setItems((prev) =>
//       prev
//         .map((item) =>
//           item.id === id
//             ? {
//                 ...item,
//                 quantity: item.quantity - 1,
//               }
//             : item
//         )
//         .filter((item) => item.quantity > 0)
//     );
//   };

//   const clearCart = () => {
//     setItems([]);
//   };

//   const total = useMemo(() => {
//     return items.reduce(
//       (acc, item) =>
//         acc + item.price * item.quantity,
//       0
//     );
//   }, [items]);

//   return (
//     <div className="min-h-screen bg-neutral-100 p-6">
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//         {/* Categories */}
//         <div className="lg:col-span-2">
//           <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm p-4">
//             <h2 className="text-lg font-bold mb-4">
//               Categories
//             </h2>

//             <div className="flex flex-col gap-2">
//               <div
//                 onClick={() =>
//                   router.push('/pos')
//                 }
//                 className="
//                   p-3
//                   rounded-2xl
//                   cursor-pointer
//                   transition-all
//                   hover:bg-neutral-100
//                   font-medium
//                   text-sm
//                 "
//               >
//                 All Categories
//               </div>

//               {categories.map((category) => (
//                 <div
//                   key={category.value}
//                   onClick={() =>
//                     router.push(
//                       `/pos?category_id=${category.value}`
//                     )
//                   }
//                   className="
//                     p-3
//                     rounded-2xl
//                     cursor-pointer
//                     transition-all
//                     hover:bg-neutral-100
//                     font-medium
//                     text-sm
//                   "
//                 >
//                   {category.label}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Products */}
//         <div className="lg:col-span-7">
//           <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm p-6">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-bold">
//                 Products
//               </h2>

//               <input
//                 placeholder="Search products..."
//                 className="
//                   h-11
//                   px-4
//                   rounded-2xl
//                   border
//                   border-neutral-200
//                   outline-none
//                   text-sm
//                   w-64
//                   focus:ring-2
//                   focus:ring-black
//                 "
//               />
//             </div>

//             {products.length > 0 ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
//                 {products.map((product) => (
//                   <div
//                     key={product.id}
//                     className="
//                       bg-white
//                       rounded-3xl
//                       border
//                       border-neutral-200
//                       shadow-sm
//                       hover:shadow-md
//                       transition-all
//                       p-4
//                     "
//                   >
//                     <div className="h-36 rounded-2xl bg-neutral-100 flex items-center justify-center">
//                       <Package className="w-10 h-10 text-neutral-400" />
//                     </div>

//                     <div className="mt-4">
//                       <h3 className="font-semibold text-base">
//                         {product.name}
//                       </h3>

//                       <p className="text-sm text-neutral-500 mt-1">
//                         Premium Product
//                       </p>
//                     </div>

//                     <div className="flex justify-between items-center mt-5">
//                       <p className="text-lg font-bold">
//                         ₹{product.price}
//                       </p>

//                       <Button
//                         onClick={() =>
//                           addToCart(product)
//                         }
//                         className="
//                           h-10
//                           px-5
//                           rounded-xl
//                           bg-black
//                           hover:bg-neutral-800
//                           text-white
//                           font-medium
//                           transition-all
//                         "
//                       >
//                         Add
//                       </Button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="flex flex-col items-center justify-center py-20 text-neutral-400">
//                 <Package className="w-12 h-12 mb-3" />

//                 <p className="text-lg">
//                   No Products Found
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Cart */}
//         <div className="lg:col-span-3">
//           <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm p-5 sticky top-5">
//             <div className="flex justify-between items-center mb-5">
//               <div className="flex items-center gap-2">
//                 <ShoppingCart className="w-5 h-5" />

//                 <h2 className="text-xl font-bold">
//                   Cart
//                 </h2>
//               </div>

//               <Button
//                 onClick={clearCart}
//                 className="
//                   w-10
//                   h-10
//                   rounded-xl
//                   bg-red-50
//                   hover:bg-red-100
//                   text-red-500
//                 "
//               >
//                 <Trash2 className="w-4 h-4" />
//               </Button>
//             </div>

//             <div className="flex flex-col gap-4 max-h-[500px] overflow-auto pr-1">
//               {items.length > 0 ? (
//                 items.map((item) => (
//                   <div
//                     key={item.id}
//                     className="
//                       border
//                       border-neutral-200
//                       rounded-2xl
//                       p-4
//                     "
//                   >
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <h3 className="font-semibold">
//                           {item.name}
//                         </h3>

//                         <p className="text-sm text-neutral-500 mt-1">
//                           ₹{item.price}
//                         </p>
//                       </div>

//                       <button
//                         onClick={() =>
//                           removeFromCart(item.id)
//                         }
//                         className="
//                           w-8
//                           h-8
//                           rounded-lg
//                           flex
//                           items-center
//                           justify-center
//                           bg-red-50
//                           hover:bg-red-100
//                           text-red-500
//                           transition-all
//                         "
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>

//                     <div className="flex justify-between items-center mt-4">
//                       <div className="flex items-center gap-3">
//                         <button
//                           onClick={() =>
//                             decreaseQuantity(
//                               item.id
//                             )
//                           }
//                           className="
//                             w-8
//                             h-8
//                             rounded-lg
//                             bg-neutral-100
//                             hover:bg-neutral-200
//                             flex
//                             items-center
//                             justify-center
//                             transition-all
//                           "
//                         >
//                           <Minus className="w-4 h-4" />
//                         </button>

//                         <span className="font-semibold">
//                           {item.quantity}
//                         </span>

//                         <button
//                           onClick={() =>
//                             increaseQuantity(
//                               item.id
//                             )
//                           }
//                           className="
//                             w-8
//                             h-8
//                             rounded-lg
//                             bg-neutral-100
//                             hover:bg-neutral-200
//                             flex
//                             items-center
//                             justify-center
//                             transition-all
//                           "
//                         >
//                           <Plus className="w-4 h-4" />
//                         </button>
//                       </div>

//                       <p className="font-bold">
//                         ₹
//                         {item.price *
//                           item.quantity}
//                       </p>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="flex flex-col items-center justify-center py-16 text-neutral-400">
//                   <ShoppingCart className="w-12 h-12 mb-3" />

//                   <p>Your cart is empty</p>
//                 </div>
//               )}
//             </div>

//             <div className="border-t border-neutral-200 mt-6 pt-5">
//               <div className="flex justify-between items-center mb-5">
//                 <span className="text-neutral-500">
//                   Total
//                 </span>

//                 <span className="text-2xl font-bold">
//                   ₹{total}
//                 </span>
//               </div>

//               <Button
//                 className="
//                   w-full
//                   h-12
//                   rounded-2xl
//                   bg-black
//                   hover:bg-neutral-800
//                   text-white
//                   font-semibold
//                   text-base
//                   transition-all
//                 "
//               >
//                 Proceed to Pay
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Items;