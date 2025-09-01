import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["Blog"],
  endpoints: (builder) => ({
    //All Blogs
    fetchBlog: builder.query({
      query: () => "AllBlogs",
      providesTags: ["Blog"],
    }),
    //Single Blog
    singleBlog: builder.query({
        query : (id: string) => `AllBlogs/${id}`,
        providesTags : ["Blog"]
      }),
    // Add Blog
    addBlog: builder.mutation({
      query: (newBlog) => ({
        url: "addBlog",
        method: "POST",
        body: newBlog,
      }),
      invalidatesTags: ["Blog"],
    }),
    // Delete my Blog
    deleteBlog: builder.mutation<void, string>({
      query: (id) => ({
        url: `User/blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog"], 
    }),
    //  AI Suggestion 
    suggestSummaryTags: builder.mutation<
      { summary: string; tags: string[] },
      { blogTitle: string; blogContent: string; lang?: "en" | "ur" } 
    >({
      query: (body) => ({
        url: "suggest",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useAddBlogMutation,
  useFetchBlogQuery,
  useSingleBlogQuery,
  useSuggestSummaryTagsMutation,
  useDeleteBlogMutation
} = blogApi;
