import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query';

// Create an API slice
export const netlifyApi = createApi({
    reducerPath: 'netlifyApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://mofo-dev.netlify.app/.netlify/functions/'}),
    endpoints: (builder) => ({
        checkLiscense: builder.query({
            query: (data) => ({
                url: `customers/${data.id}`,
                method: 'GET',
            })
        }),
    })
});

export const {useCheckBalanceQuery} = netlifyApi;
