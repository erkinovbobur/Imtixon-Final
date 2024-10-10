import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api"; 
import cartReducer from "../slices/cartSlices";
import likeReducer from "../slices/LikeSlices";
import currencyReducer from "../slices/currnsySlice"; 
import searchReducer from '../slices/searchSlice'; 
const store = configureStore({
    reducer: {
        cart: cartReducer,
        like: likeReducer,
        currency: currencyReducer, 
        [api.reducerPath]: api.reducer,
        search: searchReducer 
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware)
});

export { store };
