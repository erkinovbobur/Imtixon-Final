import { api } from "./index";
import { Product } from "../../redux/type";

export const authApi = api.injectEndpoints({
  endpoints: (build) => {
    return {
      product: build.query<Product[], void>({
        query: () => "/products.json",
      }),
      blush: build.query<Product[], void>({
        query: () => "/products.json?product_type=blush", 
      }),
      lipstick: build.query<Product[], void>({
        query: () => "/products.json?product_type=lipstick"
      }), 
    };
    
  },
});

export const { useProductQuery, useBlushQuery, useLipstickQuery } = authApi;
