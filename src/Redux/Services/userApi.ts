import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";






export const userApi = createApi({
    reducerPath : 'userApi',
    baseQuery : fetchBaseQuery({baseUrl : "/api"}),
    tagTypes: ["User"],
    endpoints : (builder) => ({
        // Fetch Profile
        getProfile  : builder.query({
            query : () => "User",
            providesTags: ["User"]
        }),
        // Fetch all user
        allUser : builder.query({
            query : () => "AllUsers",
            providesTags : ["User"]
        }),
        // fetch Single Authors for Author dynamic page 
        singleUser : builder.query({
            query : (id: string) => `AllUsers/${id}`,
            providesTags : ["User"]
        }),
         // Delete profile 
        deleteProfile: builder.mutation<void, void>({
            query: () => ({
                url: "User/delete",
                method: "DELETE",
            }),
            invalidatesTags: ["User"],
            }),
    })
})



export const {useGetProfileQuery,useAllUserQuery, useSingleUserQuery,useDeleteProfileMutation} = userApi