import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const blogApi = createApi({
    reducerPath : 'userApi',
    baseQuery : fetchBaseQuery({baseUrl : "/api"}),
    tagTypes: ["User"],
    endpoints : (builder) => ({
        getUser  : builder.query({
            query : () => "addBlog",
            providesTags: ["addBlog"]
        })
    })
})



export const {useGetUserQuery} = blogApi