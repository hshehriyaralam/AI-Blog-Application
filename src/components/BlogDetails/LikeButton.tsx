"use client";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useLikeBlogMutation } from "../../Redux/Services/blogApi";
import { useGetProfileQuery } from "../../Redux/Services/userApi";

export default function LikeButton({
  blogId,
  likes,
  likesCount,
}: {
  blogId: string;
  likes: string[];
  likesCount: number;
}) {
  // Logged in user
  const { data: loggedInUser } = useGetProfileQuery(undefined);
  const currentUserId = loggedInUser?.user?.id; 

  const [likeBlog] = useLikeBlogMutation();
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(likesCount);

  useEffect(() => {
    if (currentUserId && likes.includes(currentUserId)) {
      setLiked(true);
    }
  }, [likes, currentUserId]);

  const handleLike = async () => {
    try {
      await likeBlog(blogId).unwrap(); 
      setLiked((prev) => !prev);
      setCount((prev) => (liked ? prev - 1 : prev + 1));
    } catch (error) {
      console.error("Like failed:", error);
    }
  };

  return (
    <button
      onClick={handleLike}
      className={`flex items-center gap-1.5 px-3 py-2 rounded-full shadow-md transition-all hover:scale-105
      ${liked ? "bg-pink-700" : "bg-pink-200"}`}
    >
      <Heart
        className={`w-5 h-5 transition-colors 
        ${liked ? "text-pink-200 fill-pink-700" : "text-pink-700"}`}
      />
      <span
        className={`text-sm font-medium ${
          liked ? "text-pink-100" : "text-pink-700"
        }`}
      >
        {count}
      </span>
    </button>
  );
}
