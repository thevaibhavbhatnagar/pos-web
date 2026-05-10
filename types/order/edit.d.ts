export interface OrderItemEditFormValues {
  productId: string;
  quantity: number;
  price?: number;
}

export type PaymentMethod = "CASH" | "CARD" | "UPI";

export interface OrderEditValues {
  branchId: string;
  userId: string;

  discountAmount?: number;
  taxAmount?: number;
  paymentMethod: PaymentMethod;

  notes?: string;

  items: OrderItemFormValues[];
}
