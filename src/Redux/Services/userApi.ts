import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const userApi = createApi({
    reducerPath : 'userApi',
    baseQuery : fetchBaseQuery({baseUrl : "/api"}),
    tagTypes: ["Blog", "User","Like","Bookmark"],
    endpoints : (builder) => ({
        // Fetch Profile
        getProfile  : builder.query({
            query : () => "User",
            providesTags: ["Blog", "User","Like","Bookmark"]
        }),
        // Fetch all user
        allUser : builder.query({
            query : () => "AllUsers",
            providesTags : ["Blog", "User","Like","Bookmark"]
        }),
        // fetch Single Authors for Author dynamic page 
        singleUser : builder.query({
            query : (id: string) => `AllUsers/${id}`,
            providesTags : ["Blog", "User","Like","Bookmark"]
        }),
         // Delete profile 
        deleteProfile: builder.mutation<void, void>({
            query: () => ({
                url: "User/delete",
                method: "DELETE",
            }),
            invalidatesTags: ["Blog", "User","Like","Bookmark"],
            }),
    })
})



export const {useGetProfileQuery,useAllUserQuery, useSingleUserQuery,useDeleteProfileMutation} = userApi