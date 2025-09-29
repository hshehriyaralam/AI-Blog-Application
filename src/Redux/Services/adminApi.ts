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
    //Delete Author By Admin 
    deleteUserAdmin: builder.mutation<void, string>({
      query: (id) => ({
        url: `Admin/Users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"], 
    }),
    // All user Fetch
    allUserAdmin : builder.query({
        query : () => "Admin/Users",
        providesTags : ["User"]
    }),
  }),
});



export const {
  useAllBlogAdminQuery,
  useDeleteBlogAdminMutation,
  useAllUserAdminQuery,
  useDeleteUserAdminMutation
} = adminApi;