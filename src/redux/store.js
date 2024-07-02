 import {configureStore} from '@reduxjs/toolkit';   // import configureStore from redux toolkit
 import {netlifyApi} from './api/netlify';   // import the API slice

 export default configureStore({
    reducer : {
        [netlifyApi.reducerPath]: netlifyApi.reducer,   // add the reducer to the store
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(netlifyApi.middleware),   // add the middleware to the store
});
