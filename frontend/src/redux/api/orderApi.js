import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// create api 
export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/v1"
    }),

    endpoints: (builder) => ({
        createNewOrder: builder.mutation({
           query(body) {
             return {
                url: "/orders/new",
                method: "POST",
                body,
             }
           }
        }),
       
        

    }),
});

 export const { useCreateNewOrderMutation } = orderApi;