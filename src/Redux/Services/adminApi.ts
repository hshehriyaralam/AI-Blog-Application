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
    //Delete Blog By Admin 
    deleteBlogAdmin: builder.mutation<void, string>({
      query: (id) => ({
        url: `Admin/Blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog"], 
    }), 
  }),
});



export const {useAllBlogAdminQuery,useDeleteBlogAdminMutation} = adminApi;