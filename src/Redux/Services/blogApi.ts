import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["Blog", "User","Like","Bookmark"],
  endpoints: (builder) => ({
    //All Blogs
    fetchBlog: builder.query({
      query: () => "AllBlogs",
      providesTags: ["Blog", "User","Like","Bookmark"],
    }),
    //Single Blog
    singleBlog: builder.query({
        query : (id: string) => `AllBlogs/${id}`,
        providesTags : ["Blog", "User","Like","Bookmark"]
      }),
    // Add Blog
    addBlog: builder.mutation({
      query: (newBlog) => ({
        url: "addBlog",
        method: "POST",
        body: newBlog,
      }),
      invalidatesTags: ["Blog", "User","Like","Bookmark"],
    }),
    // Delete my Blog
    deleteBlog: builder.mutation<void, string>({
      query: (id) => ({
        url: `User/blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog", "User","Like","Bookmark"], 
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
    // liked blogs 
    likeBlog: builder.mutation({
      query: (id: string) => ({
        url: `AllBlogs/${id}/like`,
        method: "POST",
      }),
      invalidatesTags: ["Blog", "User","Like","Bookmark"], 
    }),
  }),
});

export const {
  useAddBlogMutation,
  useFetchBlogQuery,
  useSingleBlogQuery,
  useSuggestSummaryTagsMutation,
  useDeleteBlogMutation,
  useLikeBlogMutation
} = blogApi;
