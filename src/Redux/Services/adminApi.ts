import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["Blog", "User"],
  endpoints: (builder) => ({
     //All Blogs
    allBlogAdmin: builder.query({
      query: () => "Admin/Blogs",
      providesTags: ["Blog"],
    }),
  }),
});



export const {useAllBlogAdminQuery} = adminApi;