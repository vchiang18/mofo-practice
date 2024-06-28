import {createAPI} from '@reduxjs/toolkit/query/react';

// Create an API slice
export const stripeApi = createAPI({
    reducerPath: 'netlifyAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'https://netlify/'}),
    endpoints: (builder) => ({
        checkLiscense: builder.query({
            query: (data) => ({
                url: `customers/${data.id}`,
                method: 'GET',
            })
        }),
    })
});

export const {useCheckBalanceQuery} = stripeApi;
