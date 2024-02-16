import { Product } from "api/Api.types";

export type CartProduct = {
  id: number;
  title: string;
  thumbnail: string;
  stock: number;
  price: number;
  count: number;
};

export type AppState = {
  isLoading: boolean;
  products: Product[];
  categories: string[];
  cart: CartProduct[];
  currentPage: number;
  total: number;
  currentCategory: string;
  isProductsLoading: boolean;
};

export type UpdateCartItemCountPayload = {
  id: number;
  count: number;
};
