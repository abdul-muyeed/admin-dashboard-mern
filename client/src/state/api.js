import { createApi, fetchBaseQuery,  } from '@reduxjs/toolkit/query/react'


export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'https://68644lzf-3000.inc1.devtunnels.ms/' }),
    reducerPath: 'adminApi',
    tagTypes: ['User', 'products','customers', 'transactions'],
    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => `general/user/${id}`,
            providesTags: ['User']
        }),
        getProducts: build.query({
            query: () => 'client/products',
            providesTags: ['products']
        }),
        getCustomers: build.query({
            query: () => 'client/customers',
            providesTags: ['customers']
        }),
        getTransactions: build.query({
            query: ({page, pageSize, sort, search}) =>({
                url: 'client/transactions',
                params: {
                    page,
                    pageSize,
                    sort,
                    search
                }
            }),
            providesTags: ['transactions']
        }),
    })
})

export const { useGetUserQuery, useGetProductsQuery, useGetCustomersQuery, useGetTransactionsQuery } = api;