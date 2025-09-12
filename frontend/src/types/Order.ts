export type Order = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  price: number;
  created_at: Date;
  OrderItems: {
    id: number;
    name: string;
    order_id: number;
    product_id: number;
    price: number;
    quantity: number;
    image_url?: string;
  }[];
};

export type NewOrder = {
  name: string;
  email: string;
  phone: string;
  address: string;
  price: number;
  items: {
    id: number;
    name: string;
    product_id: number;
    price: number;
    quantity: number;
    image_url?: string;
  }[];
};
