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
      foundation: build.query<Product[], void>({
        query: () => "/products.json?product_type=foundation"
      }), 
      eyeliner: build.query<Product[], void>({
        query: () => "/products.json?product_type=eyeliner"
      }),
      mascara: build.query<Product[], void>({
        query: () => "/products.json?product_type=mascara"
      }),  
      bronzer: build.query<Product[], void>({
        query: () => "/products.json?product_type=bronzer"
      }),  
    };
    
  },
});

export const { useProductQuery, useBlushQuery, useLipstickQuery, useFoundationQuery, useEyelinerQuery, useMascaraQuery, useBronzerQuery  } = authApi;
