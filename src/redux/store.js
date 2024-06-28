 import {configureStore} from '@reduxjs/toolkit';   // import configureStore from redux toolkit
 import {netlifyAPI} from './api/stripe';   // import the API slice

 export default configureStore({
    reducer : {
        [netlifyAPI.reducerPath]: stripeApi.reducer,   // add the reducer to the store
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(netlifyAPI.middleware),   // add the middleware to the store
});
