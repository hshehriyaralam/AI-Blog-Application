import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["Blog"],
  endpoints: (builder) => ({
    fetchBlog: builder.query({
      query: () => "AllBlogs",
      providesTags: ["Blog"],
    }),
    addBlog: builder.mutation({
      query: (newBlog) => ({
        url: "addBlog",
        method: "POST",
        body: newBlog,
      }),
      invalidatesTags: ["Blog"],
    }),

    // ✅ AI Suggestion endpoint
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
  useSuggestSummaryTagsMutation,
} = blogApi;
