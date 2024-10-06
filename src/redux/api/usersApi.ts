import { api } from "./index";
 import { Product } from "../../redux/type";
 
 

 export const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        product: build.query<Product[], void>({
            query: () => "/products.json", 

        }),
    }),
});

export const { useProductQuery } = authApi;