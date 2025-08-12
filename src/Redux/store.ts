import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer  from './Slices/authSlice'




export const store = configureStore({
    reducer : {
        auth : authReducer
    },
    
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


setupListeners(store.dispatch)

