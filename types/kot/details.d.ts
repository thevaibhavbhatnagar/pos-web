export interface KotDetailsType {
  id: string;
  kotNo: string;
  orderId: string;
  order: Order;
  kotItems: KotItem[];
  status: 'PENDING' | 'PREPARING' | 'READY' | 'SERVED';
  createdAt: string;
}

export interface Order {  
  id: string;
  billNo: string;
  totalAmount: number;
  status: 'PENDING' | 'PREPARING' | 'READY' | 'COMPLETED';
  branchId: string;
  branch: Branch;
  userId: string;
  user: User;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface Branch {
  id: string;
  name: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface OrderItem {
  id: string; 
  product:{
    name: string;
    id: string;   
  }
  productId: string;
  quantity: number;
  price: number;
  total?: number;
}


export interface KotItem {
  id: string;

  kotId: string;

  orderItemId: string;
  orderItem: OrderItem;

  quantity: number;
}