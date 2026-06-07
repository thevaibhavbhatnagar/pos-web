export interface OrderItemFormValues {
  productId: string;
  quantity: number;
  price?: number;
  addonIds?: string[];
}



export type PaymentMethod = "CASH" | "CARD" | "UPI";

export interface OrderFormValues {
  branchId: string;
  userId: string;

  discountAmount?: number;
  taxAmount?: number;
  paymentMethod: PaymentMethod;

  notes?: string;

  items: OrderItemFormValues[];
}
