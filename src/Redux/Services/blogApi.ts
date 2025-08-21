import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const blogApi  = createApi({
    reducerPath : "blogApi",
    baseQuery : fetchBaseQuery({baseUrl : '/api'}),
    tagTypes : ["Blog"],
    endpoints : (builder) => ({

        // add blogs
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

export const { useAddBlogMutation } = blogApi;