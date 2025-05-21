import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { productApi } from "./api/productsApi"
import { authApi } from "./api/authApi"
import { userApi } from "./api/userApi"
import userReducer from "./features/userSlice";
import cartReducer from "./features/cartSlice"

// create store which is going to be use in our entry point (index.js)

export const store = configureStore({
    reducer: {
        auth: userReducer,
        cart:cartReducer,
        [productApi.reducerPath]: productApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([productApi.middleware, authApi.middleware, userApi.middleware]),
})