import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer  from './Slices/authSlice'
import { userApi } from './Services/userApi'




export const store = configureStore({
    reducer : {
        auth : authReducer,
        [userApi.reducerPath]: userApi.reducer
    },

    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
    
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


setupListeners(store.dispatch)

