    import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


    export const blogApi  = createApi({
        reducerPath : "blogApi",
        baseQuery : fetchBaseQuery({baseUrl : '/api'}),
        tagTypes : ["Blog"],
        endpoints : (builder) => ({
            fetchBlog : builder.query({
                query : () => 'FetchBlog',
                providesTags : ["Blog"]
            }),
            addBlog : builder.mutation({
                query : (newBlog) => ({
                    url : "addBlog",
                    method : "POST",
                    body : newBlog,
                }),
                invalidatesTags : ["Blog"]
            })
        }),
    })

    export const { useAddBlogMutation, useFetchBlogQuery } = blogApi;