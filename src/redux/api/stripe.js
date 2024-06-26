import {createAPI} from '@reduxjs/toolkit/query/react';

// Create an API slice
export const stripeApi = createAPI({
    reducerPath: 'srtipeApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://api.stripe.com/v1/'}),
    endpoints: (builder) => ({
        getCustomer: builder.query({
            query: (data) => ({
                url: `customers/${data.id}`,
                method: 'GET',
            })
        }),
        getSubscription: builder.query({
            query: (data) => ({
                url: `subscriptions/${data.id}`,
                method: 'GET',
            })
        }),
        getSubItems: builder.query({
            query: (data) => ({
                url: `subscription_items/${data.id}`,
                method: 'GET',
            })
        }),
    })
});

export const {useGetCustomerQuery, useGetSubscriptionsQuery, useGetSubItemsQuery} = stripeApi;
