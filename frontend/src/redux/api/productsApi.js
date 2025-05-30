import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// create api 
export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/v1"
    }),

    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (params) => ({
                url: "/products",
                params: {
                    page: params?.page,
                    keyword: params?.keyword,
                    category: params?.category,
                    ...(params?.min !== undefined && { "price[gte]": params.min }),
                    ...(params?.max !== undefined && { "price[lte]": params.max }),
                    ...(params?.ratings !== undefined && { "price[gte]": params.ratings }),
                }
            }),

        }),
        getProductDetails: builder.query({
            query: (id) => `/products/${id}`,

        }),

    }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } = productApi;