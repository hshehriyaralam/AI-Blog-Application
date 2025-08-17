import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";





export const userApi = createApi({
    reducerPath : 'userApi',
    baseQuery : fetchBaseQuery({baseUrl : "/api"}),
    tagTypes: ["User"],
    endpoints : (builder) => ({
        getUser  : builder.query({
            query : () => "user",
            providesTags: ["User"]
        })
    })
})



export const {useGetUserQuery} = userApi