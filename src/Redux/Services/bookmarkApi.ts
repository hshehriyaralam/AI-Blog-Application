import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookmarkApi = createApi({
  reducerPath: "bookmarkApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Blog", "User","Like","Bookmark"],
  endpoints: (builder) => ({
    // ✅ Get user bookmarks
    getBookmarks: builder.query<any, void>({
      query: () => "/Bookmark",
      providesTags: ["Blog", "User","Like","Bookmark"],
    }),

    // ✅ Toggle bookmark (add/remove)
    toggleBookmark: builder.mutation<any, { blogId: string }>({
      query: ({ blogId }) => ({
        url: "/Bookmark",
        method: "POST",
        body: { blogId },
      }),
      invalidatesTags: ["Blog", "User","Like","Bookmark"], 
    }),
  }),
});

export const { useGetBookmarksQuery, useToggleBookmarkMutation } = bookmarkApi;
