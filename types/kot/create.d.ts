export interface OrderItemFormValues {
  productId: string;
  quantity: number;
  price?: number;
}

export type PaymentMethod = "CASH" | "CARD" | "UPI";

export interface OrderFormValues {
  branchId: string;
  userId: string;

  discountAmount?: number;
  taxAmount?: number;

  notes?: string;

  items: OrderItemFormValues[];
}
