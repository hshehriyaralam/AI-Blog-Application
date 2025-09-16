"use client";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useLikeBlogMutation } from "../../Redux/Services/blogApi";
import { useGetProfileQuery } from "../../Redux/Services/userApi";
import LikedByUser from "./likedbyUser";

export interface IUser {
  id: string;
  name: string;
  profilePic: string;
}

export default function LikeButton({
  blogId,
  likes,
  likesCount,
}: {
  blogId: string;
  likes: IUser[];
  likesCount: number;
}) {
  const { data: loggedInUser } = useGetProfileQuery(undefined);
  const currentUserId = loggedInUser?.user?.id; 

  const [likeBlog] = useLikeBlogMutation();
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(likesCount);

  useEffect(() => {
    if (currentUserId && likes.some((u) => u.id === currentUserId)) {
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
    <div className="flex flex-col gap-1">
      {/* Like button */}
      <button
        onClick={handleLike}
        className={`flex items-center cursor-pointer gap-1.5 px-3 py-2 rounded-full shadow-md transition-all hover:scale-105
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

      {/* ✅ LikedByUser */}
      <LikedByUser likedUsers={likes} />
    </div>
  );
}
