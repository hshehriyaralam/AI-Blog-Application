    import { configureStore } from "@reduxjs/toolkit";
    import { setupListeners } from "@reduxjs/toolkit/query";
    import authReducer  from './Slices/authSlice'
    import { userApi } from './Services/userApi'
    import { blogApi } from "./Services/blogApi";




    export const store = configureStore({
        reducer : {
            auth : authReducer,
            [userApi.reducerPath]: userApi.reducer,
            [blogApi.reducerPath]: blogApi.reducer,
        },

        middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware,blogApi.middleware),
        
    })


    export type RootState = ReturnType<typeof store.getState>;
    export type AppDispatch = typeof store.dispatch;


    setupListeners(store.dispatch)

