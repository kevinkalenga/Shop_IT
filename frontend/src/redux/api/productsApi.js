import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// create api 
export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/v1"
    }),

    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (params) => "/products",

        }),
        getProductDetails: builder.query({
            query: (id) => `/products/${id}`,

        }),

    }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } = productApi;