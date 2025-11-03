'use client'
import { useState, useEffect, useContext, useMemo } from "react";
import { ContextTheme } from "../../../Context/DarkTheme";
import LikedFilter from "../../../components/useLikedComp/likedFilter";
import LoadingPage from "../../../components/layout/LoadingPage";
import LikeBlogsStats from "../../../components/useLikedComp/likeBlogsStats";
import LikedLists from "../../../components/useLikedComp/LikedList"

interface Like {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userAvatar?: string;
  blogId: string;
  blogTitle: string;
  blogAuthor: string;
  likedAt: string;
}

export default function UserLikes() {
  const { themeValue, light, dark } = useContext(ContextTheme);
  const [likes, setLikes] = useState<Like[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Sample data - Replace with API call
  useEffect(() => {
    const loadLikesData = () => {
      const sampleLikes: Like[] = [
        {
          id: "1",
          userId: "user1",
          userName: "John Doe",
          userEmail: "john@example.com",
          userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
          blogId: "blog1",
          blogTitle: "Getting Started with Next.js 14",
          blogAuthor: "Jane Smith",
          likedAt: "2024-01-20T10:30:00Z"
        },
        {
          id: "2",
          userId: "user2",
          userName: "Mike Johnson",
          userEmail: "mike@example.com", 
          userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
          blogId: "blog2",
          blogTitle: "React Hooks Best Practices",
          blogAuthor: "Sarah Wilson",
          likedAt: "2024-01-19T15:45:00Z"
        },
        {
          id: "3",
          userId: "user3",
          userName: "Emily Davis",
          userEmail: "emily@example.com",
          userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
          blogId: "blog1", 
          blogTitle: "Getting Started with Next.js 14",
          blogAuthor: "Jane Smith",
          likedAt: "2024-01-19T09:15:00Z"
        },
        {
          id: "4",
          userId: "user1",
          userName: "John Doe",
          userEmail: "john@example.com",
          userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
          blogId: "blog3",
          blogTitle: "TypeScript for React Developers",
          blogAuthor: "Alex Chen",
          likedAt: "2024-01-18T14:20:00Z"
        },
        {
          id: "5",
          userId: "user4",
          userName: "David Brown",
          userEmail: "david@example.com",
          userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
          blogId: "blog2",
          blogTitle: "React Hooks Best Practices", 
          blogAuthor: "Sarah Wilson",
          likedAt: "2024-01-18T11:00:00Z"
        }
      ];

      setLikes(sampleLikes);
      setLoading(false);
    };

    setTimeout(loadLikesData, 1000);
  }, []);

  // Filter likes based on search
  const filteredLikes = useMemo(() => {
    if (!searchQuery) return likes;
    
    const query = searchQuery.toLowerCase();
    return likes.filter(like =>
      like.userName.toLowerCase().includes(query) ||
      like.blogTitle.toLowerCase().includes(query) ||
      like.blogAuthor.toLowerCase().includes(query)
    );
  }, [likes, searchQuery]);


  if (loading) return  <LoadingPage />

  return (
    <div className={`min-h-screen ${themeValue ? light : dark} p-6`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className={`text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent`}>
                User Likes
              </h1>
              <p className={`mt-2 ${themeValue ? 'text-gray-600' : 'text-gray-300'}`}>
                Track which users liked which blogs
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <LikedFilter  
        themeValue={themeValue}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        light={light}
        dark={dark}
        />
        <LikeBlogsStats 
        light={light}
        dark={dark}
        themeValue={themeValue}
        likes={likes} />

        {/* Likes Table */}
        <LikedLists
        filteredLikes={filteredLikes}
        searchQuery={searchQuery}
        />

        {/* Results Info */}
        {filteredLikes.length > 0 && (
          <div className={`mt-4 text-sm ${
            themeValue ? 'text-gray-600' : 'text-gray-300'
          }`}>
            Showing {filteredLikes.length} of {likes.length} likes
            {searchQuery && ` for "${searchQuery}"`}
          </div>
        )}
      </div>
    </div>
  );
}