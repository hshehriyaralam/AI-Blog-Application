import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";





export const userApi = createApi({
    reducerPath : 'userApi',
    baseQuery : fetchBaseQuery({baseUrl : "/api"}),
    tagTypes: ["User"],
    endpoints : (builder) => ({
        getUser  : builder.query({
            query : () => "User",
            providesTags: ["User"]
        }),
        allUser : builder.query({
            query : () => "AllUsers",
            providesTags : ["User"]
        })
    })
})



export const {useGetUserQuery,useAllUserQuery} = userApi