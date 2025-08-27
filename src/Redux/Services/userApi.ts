import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";





export const userApi = createApi({
    reducerPath : 'userApi',
    baseQuery : fetchBaseQuery({baseUrl : "/api"}),
    tagTypes: ["User"],
    endpoints : (builder) => ({
        getProfile  : builder.query({
            query : () => "User",
            providesTags: ["User"]
        }),
        allUser : builder.query({
            query : () => "AllUsers",
            providesTags : ["User"]
        }),
        singleUser : builder.query({
            query : (id: string) => `AllUsers/${id}`,
            providesTags : ["User"]
        })
    })
})



export const {useGetProfileQuery,useAllUserQuery, useSingleUserQuery} = userApi