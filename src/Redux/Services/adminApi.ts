import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["Blog", "User","Like","Bookmark"],
  endpoints: (builder) => ({
     //All Blogs
    allBlogAdmin: builder.query({
      query: () => "Admin/Blogs",
      providesTags: ["Blog", "User","Like","Bookmark"]
    }),
    //Delete Blog By Admin 
    deleteBlogAdmin: builder.mutation<void, string>({
      query: (id) => ({
        url: `Admin/Blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog", "User","Like","Bookmark"]
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
        providesTags : ["Blog", "User","Like","Bookmark"]
    }),
    // fetch All Likes
    allLikesAdmin : builder.query({
        query : () => "Admin/Likes",
        providesTags :["Blog", "User","Like","Bookmark"]
    }),
    // fetch all Bookmarks by admin
    allbookmarksAdmin : builder.query({
        query : () => "Admin/Bookmarks",
        providesTags :["Blog", "User","Like","Bookmark"]
    }),
  }),
});



export const {
  useAllBlogAdminQuery,
  useDeleteBlogAdminMutation,
  useAllUserAdminQuery,
  useDeleteUserAdminMutation,
  useAllLikesAdminQuery,
  useAllbookmarksAdminQuery
} = adminApi;