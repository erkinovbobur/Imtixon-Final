import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api"; // Adjust this import based on your API setup
import cartReducer from "../slices/cartSlices";
import likeReducer from "../slices/LikeSlices";
import currencyReducer from "../slices/currnsySlice"; // Import the currency slice

const store = configureStore({
    reducer: {
        cart: cartReducer,
        like: likeReducer,
        currency: currencyReducer, // Add the currency reducer
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware)
});

export { store };
