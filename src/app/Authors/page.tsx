"use client";
import { ContextTheme } from "../../Context/DarkTheme";
import { useContext } from "react";
import { useAllUserQuery,useGetProfileQuery } from "../../Redux/Services/userApi";
import AuthorsCard from "../../components/AuthorsComponents/AuthorsCard"

export default function Authors() {
    const { data : loggedInUser} = useGetProfileQuery(undefined, {
  pollingInterval: 10000, 
})
    const { data:allUsers } = useAllUserQuery(undefined, {
  pollingInterval: 10000, 
});
    const { themeValue, light, dark } = useContext(ContextTheme);

    
    const loggedInUserId =  loggedInUser?.user?._id;   
    const users = allUsers?.data || [];


  return (
    <div className={`w-full min-h-screen px-4 py-8 ${themeValue ? light : dark}`}>
      {/* Header Section */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
          Meet Our Creative Authors
        </h1>
        <p className={`text-lg ${themeValue ? "text-gray-600" : "text-gray-400"} max-w-2xl mx-auto`}>
          Discover the talented writers and contributors who bring amazing content to our platform
        </p>
      </div>

      {/* Authors Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((user: any, index: number) => {
            const isYou = user.id === loggedInUserId;

          const joinedDate = user.createdAt
            ? new Date(user.createdAt).toLocaleDateString("en-US", {
                month: "long", 
                day: "numeric", 
                year: "numeric", 
              })
            : "N/A";

            // Last Seen → Full Date + Time
            const lastSeen = user.lastSeenAt
              ? new Date(user.lastSeenAt).toLocaleString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "N/A";

            return (
              <div key={index}>
              <AuthorsCard
              user={user}
              isYou={isYou}
              joinedDate={joinedDate}
              lastSeen={lastSeen}
              />
              </div>
              );
          })}
        </div>
      </div>
    </div>
  );
}
