export interface ProductListType {
  srNo?: Number;
  id: string;
  name: string;
  price: string;
  isKotRequired: boolean;
  categoryId: string;
  category: { id: string; name: string };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
