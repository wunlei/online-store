import { AppState } from "store/slices/appSlice.types";
import { RootState } from "store/store";

export const appSelector = (state: RootState): AppState => state.app;

export const productsSelector = (state: RootState) =>
  appSelector(state).products;

export const categoriesSelector = (state: RootState) =>
  appSelector(state).categories;

export const cartSelector = (state: RootState) => appSelector(state).cart;

export const totalSelector = (state: RootState) => appSelector(state).total;

export const currentPageSelector = (state: RootState) =>
  appSelector(state).currentPage;

export const currentCategorySelector = (state: RootState) =>
  appSelector(state).currentCategory;

export const isProductsLoadingSelector = (state: RootState) =>
  appSelector(state).isProductsLoading;
