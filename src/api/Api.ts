import {
  LIMIT,
  API_Endpoints,
  BASE_URL_API,
  API_SearchParams,
} from "constants/ApiConstants";
import { FetchAllProductsParams, ApiResponse, Product } from "./Api.types";

export async function fetchAllProducts({
  page = 0,
  limit = LIMIT,
}: FetchAllProductsParams): Promise<ApiResponse> {
  const url = new URL(API_Endpoints.products, BASE_URL_API);

  const options = {
    method: "GET",
  };

  url.searchParams.append(API_SearchParams.limit, limit.toString());
  url.searchParams.append(API_SearchParams.skip, page.toString());

  return fetch(url.toString(), options)
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
      throw new Error(resp.statusText);
    })
    .catch((error) => {
      throw new Error(error);
    });
}

export async function fetchProduct(id: string): Promise<Product> {
  const url = new URL(`${API_Endpoints.products}/${id}`, BASE_URL_API);

  const options = {
    method: "GET",
  };

  return fetch(url.toString(), options)
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
      throw new Error(resp.statusText);
    })
    .catch((error) => {
      throw new Error(error);
    });
}

export async function fetchAllCategories(): Promise<string[]> {
  const url = new URL(API_Endpoints.categories, BASE_URL_API);

  const options = {
    method: "GET",
  };

  return fetch(url.toString(), options)
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
      throw new Error(resp.statusText);
    })
    .catch((error) => {
      throw new Error(error);
    });
}

export type FetchCategoryPArams = {
  page?: number;
  limit?: number;
  category: string;
};

export async function fetchProductsFromCategory({
  category,
  page = 0,
  limit = LIMIT,
}: FetchCategoryPArams): Promise<ApiResponse> {
  const url = new URL(`${API_Endpoints.category}/${category}`, BASE_URL_API);

  const options = {
    method: "GET",
  };

  url.searchParams.append(API_SearchParams.limit, limit.toString());
  url.searchParams.append(API_SearchParams.skip, page.toString());

  return fetch(url.toString(), options)
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
      throw new Error(resp.statusText);
    })
    .catch((error) => {
      throw new Error(error);
    });
}

export type FetchSearchQuery = {
  query: string;
  page?: number;
  limit?: number;
};

export async function fetchSearchQuery({
  query,
  page = 0,
  limit = LIMIT,
}: FetchSearchQuery): Promise<ApiResponse> {
  const url = new URL(API_Endpoints.search, BASE_URL_API);

  const options = {
    method: "GET",
  };

  url.searchParams.append("q", query);
  url.searchParams.append(API_SearchParams.limit, limit.toString());
  url.searchParams.append(API_SearchParams.skip, page.toString());

  return fetch(url.toString(), options)
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
      throw new Error(resp.statusText);
    })
    .catch((error) => {
      throw new Error(error);
    });
}
