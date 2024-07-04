import {configureStore} from '@reduxjs/toolkit';   // import configureStore from redux toolkit
import {netlifyApi} from './api/netlify';   // import the API slice
import fieldsReducer from './slices/fields';   // import the fields slice

 export default configureStore({
    reducer : {
        fields: fieldsReducer,   // add the fields reducer to the store
        [netlifyApi.reducerPath]: netlifyApi.reducer,   // add the reducer to the store
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(netlifyApi.middleware),   // add the middleware to the store
});
