export interface OrderListType {
  id: string;
  billNo: string;

  totalAmount: number;
  subTotal: number;
  discountAmount: number;
  taxAmount: number;

  paymentMethod: string;
  status: string;

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

  createdAt: string;
  updatedAt: string;
}