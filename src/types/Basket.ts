import { Product } from './Product';

export type BasketItem = {
  product: Product;
  quantity: number;
  uid?: string;
};

export type Basket = {
  items: BasketItem[];
  originalAmount: number;
  totalAmount: number;
};
