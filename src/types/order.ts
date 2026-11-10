export interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface OrderData {
  orderId: string;
  orderDate: string;
  items: OrderItem[];
  totalPrice: number;
  shippingFee: number;
  grandTotal: number;
  name: string;
  email: string;
  phone: string;
  postalCode: string;
  address: string;
  building: string;
  deliveryDate: string;
  deliveryTime: string;
  payment: string;
  note: string;
}