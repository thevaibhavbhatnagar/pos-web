export interface ProductSalesReportItem {
  srNo?: Number;
  id: string;
  productId: string;
  productName: string;
  price: number;
  image: string | null;
  category: string;
  quantitySold: number;
  totalSales: number;
}
