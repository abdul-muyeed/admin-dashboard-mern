import { createApi, fetchBaseQuery,  } from '@reduxjs/toolkit/query/react'


export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    reducerPath: 'adminApi',
    tagTypes: ['User', 'products','customers', 'transactions','geography'],
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
        getGeography: build.query({
            query: () => 'client/geography',
            providesTags: ['geography']
        }),

    })
})

export const { useGetUserQuery, useGetProductsQuery, useGetCustomersQuery, useGetTransactionsQuery, useGetGeographyQuery } = api;