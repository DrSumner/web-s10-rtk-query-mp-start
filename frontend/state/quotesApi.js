// create your RTK Query endpoints here
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quotesApi = createApi({
    reducerPath : 'quotesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9009/api/quotes/'}),
    tagTypes: ['Quotes'],
    endpoints: builder => ({
        getQuotes: builder.query({
            query: () => '',
            providesTags: ['Quotes']
        }),
        createQuotes: builder.mutation({
            query: quote => ({
                
                method: 'POST',
                body: {authorName: quote.authorName, quoteText: quote.quoteText},
            }),
            invalidatesTags: ['Quotes']
        }),
        deleteQuotes: builder.mutation({
            query: quote => ({
                url: `${quote.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Quotes']
        }),
        toggleFake: builder.mutation({
            query: quote => ({
                url: `${quote.id}`,
                method: 'PUT',
                body: {apocryphal: !quote.apocryphal},
            }),
            invalidatesTags: ['Quotes']
        }),
    }),
})

export const {
    useGetQuotesQuery,
    useCreateQuotesMutation,
    useDeleteQuotesMutation,
    useToggleFakeMutation,
} = quotesApi;
