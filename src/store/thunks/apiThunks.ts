import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllProducts, fetchProduct, fetchAllCategories, FetchCategoryPArams, fetchProductsFromCategory, FetchSearchQuery, fetchSearchQuery } from "api/Api";
import { FetchAllProductsParams } from "api/Api.types";

export const getAllProducts = createAsyncThunk(
  "app/getAllProducts",
  async (value: FetchAllProductsParams) => {
    const response = await fetchAllProducts(value);
    return response;
  },
);

export const getProductById = createAsyncThunk(
  "app/getProductById",
  async (id: string) => {
    const response = await fetchProduct(id);
    return response;
  },
);

export const getAllCategories = createAsyncThunk(
  "app/getAllCategories",
  async () => {
    const response = await fetchAllCategories();
    return response;
  },
);

export const getProductsFromCategory = createAsyncThunk(
  "app/getCategory",
  async (value: FetchCategoryPArams) => {
    let skip = 0;

    if (value.page) {
      skip = value.page * (value.limit || 10);
    }

    const params = {
      ...value,
      page: skip,
    };

    if (value.category === "all") {
      const response = await fetchAllProducts(params);
      return response;
    }

    const response = await fetchProductsFromCategory(params);
    return response;
  },
);

export const getSearchQuery = createAsyncThunk(
  "app/getSearchQuery",
  async (value: FetchSearchQuery) => {
    const response = await fetchSearchQuery(value);
    return response;
  },
);
