import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getAllProducts,
  getProductsFromCategory,
  getSearchQuery,
  getAllCategories,
} from "store/thunks/apiThunks";
import {
  AppState,
  CartProduct,
  UpdateCartItemCountPayload,
} from "./appSlice.types";
import { getCartFromLS } from "utils";

const initialState: AppState = {
  isLoading: false,
  products: [],
  categories: [],
  cart: getCartFromLS() || [],
  currentPage: 0,
  total: 0,
  currentCategory: "all",
  isProductsLoading: false,
};

const appSlice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<CartProduct>) {
      const newArr = state.cart.concat(action.payload);
      return {
        ...state,
        cart: newArr,
      };
    },
    removeItemFromCart(state, action: PayloadAction<number>) {
      const result = state.cart.filter((el) => el.id !== action.payload);
      return { ...state, cart: result };
    },
    updateCartItemCount(
      state,
      action: PayloadAction<UpdateCartItemCountPayload>,
    ) {
      const result = state.cart.map((el) => {
        if (el.id === action.payload.id) {
          const updatedItem = {
            ...el,
          };
          updatedItem.count = action.payload.count;
          return updatedItem;
        }
        return el;
      });

      return {
        ...state,
        cart: result,
      };
    },
    updateCartFromLS(state, action: PayloadAction<CartProduct[]>) {
      state.cart = action.payload;
    },
    updatePageNumber(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    updateCategory(state, action: PayloadAction<string>) {
      state.currentCategory = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.total = action.payload.total;
        state.isProductsLoading = false;
        const page = action.payload.skip / action.payload.limit;

        if (page > state.currentPage) {
          state.products = state.products.concat(action.payload.products);
        } else {
          state.products = action.payload.products;
          state.currentPage = 0;
        }
      })
      .addCase(getProductsFromCategory.fulfilled, (state, action) => {
        state.total = action.payload.total;
        state.isProductsLoading = false;

        const page = action.payload.skip / action.payload.limit;

        if (page !== 0) {
          state.products = state.products.concat(action.payload.products);
        } else {
          state.products = action.payload.products;
        }
      })
      .addCase(getProductsFromCategory.pending, (state) => {
        state.isProductsLoading = true;
      })
      .addCase(getSearchQuery.fulfilled, (state, action) => {
        state.total = action.payload.total;
        state.isProductsLoading = false;
        const page = action.payload.skip / action.payload.limit;

        if (page > state.currentPage) {
          state.products = state.products.concat(action.payload.products);
        } else {
          state.products = action.payload.products;
          state.currentPage = 0;
        }
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  updateCartItemCount,
  updatePageNumber,
  updateCategory,
  updateCartFromLS,
} = appSlice.actions;
export const appReducer = appSlice.reducer;
