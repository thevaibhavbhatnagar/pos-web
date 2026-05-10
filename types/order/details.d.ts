export interface OrderDetailsType {
  id: string;
  billNo: string;

  totalAmount: number;
  subTotal: number;
  discountAmount: number;
  taxAmount: number;

  paymentMethod: string;
  status: string;
  paymentStatus: string;

  notes: string | null;

  branchId: string;
  branch: {
    id: string;
    name: string;
  };

  userId: string;
  user: {
    id: string;
    name: string;
    email: string;
  };

  items: {
    id: string;

    quantity: number;
    price: number;
    total: number;

    productId: string;

    product: {
      id: string;
      name: string;
      price: number;
    };
  }[];

  kots: KotDetailsType[];

  createdAt: string;
  updatedAt: string;
}

export interface KotDetailsType {
  id: string;
  kotNo: string;

  orderId: string;

  status: "PENDING" | "PREPARING" | "READY" | "SERVED";

  items: KotItemType[];

  createdAt: string;
  updatedAt: string;
}

export interface KotItemType {
  id: string;

  quantity: number;

  productId: string;

  product: {
    id: string;
    name: string;
    price: number;
  };
}