'use client';
import { useContext, useEffect, useMemo, useState } from "react";
import { ContextTheme } from "../../../Context/DarkTheme";
import LikedFilter from "../../../components/useLikedComp/likedFilter";
import LoadingPage from "../../../components/layout/LoadingPage";
import LikedLists from "../../../components/useLikedComp/LikedList";
import { useAllLikesAdminQuery } from "../../../Redux/Services/adminApi";

interface LikeData {
  userName: string;
  userEmail: string;
  userProfile?: string;
  blogTitle: string;
  likedAt: string;
  blogImage? : string;
  blogSummary? : string;
}

export default function UserLikes() {
  const { data: likesData, isLoading } = useAllLikesAdminQuery(undefined, {
  pollingInterval: 10000,
});
  const { themeValue, light, dark } = useContext(ContextTheme);
  const [likes, setLikes] = useState<LikeData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

 

useEffect(() => {
  if (likesData?.data) {
    const formatted = likesData.data.map((like: any) => ({
      userId: like.userId,
      userName: like?.user?.name || "Unknown User",
      userEmail: like?.user?.email || "N/A",
      userProfile: like?.user?.profilePic || "/default-avatar.png",

      blogId: like?.blogId,
      blogTitle: like?.blog?.blogTitle || "Unknown Blog",
      blogImage: like?.blog?.blogImage || "",
      blogSummary: like?.blog?.blogSummary || "",
      blogCreatedAt: like?.blog?.createdAt || "",
      likedAt: like?.likedAt || "",

      authorId: like?.blog?.author?.id || "",
      authorName: like?.blog?.author?.name || "Unknown Author",
      authorEmail: like?.blog?.author?.email || "",
      authorProfile: like?.blog?.author?.profilePic || "/default-avatar.png",
    }));

    setLikes(formatted);
  }
}, [likesData]);


  const filteredLikes = useMemo(() => {
    if (!searchQuery) return likes;
    const query = searchQuery.toLowerCase();
    return likes.filter((like) =>
      like.userName.toLowerCase().includes(query) ||
      like.userEmail.toLowerCase().includes(query) ||
      like.blogTitle.toLowerCase().includes(query)
    );
  }, [likes, searchQuery]);

  if (isLoading) return <LoadingPage />;

  return (
    <div className={`min-h-screen ${themeValue ? light : dark} md:p-6 sm:p-2`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            User Likes
          </h1>
          <p className={`${themeValue ? "text-gray-600" : "text-gray-300"} mt-2`}>
            See which users liked which blogs
          </p>
        </div>

        {/* Search Filter */}
        <LikedFilter
          themeValue={themeValue}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          light={light}
          dark={dark}
        />

        {/* Likes Table */}
        <LikedLists
          themeValue={themeValue}
          light={light}
          dark={dark}
          filteredLikes={filteredLikes}
          searchQuery={searchQuery}
        />

        {/* Footer Info */}
        {filteredLikes.length > 0 && (
          <div
            className={`mt-4 text-sm ${
              themeValue ? "text-gray-600" : "text-gray-300"
            }`}
          >
            Showing {filteredLikes.length} of {likes.length} likes
            {searchQuery && ` for "${searchQuery}"`}
          </div>
        )}
      </div>
    </div>
  );
}