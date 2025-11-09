"use client";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useLikeBlogMutation } from "../../Redux/Services/blogApi";
import { useGetProfileQuery } from "../../Redux/Services/userApi";

export interface IUser {
  id?: string;
  _id?: string;
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
  const { data } = useGetProfileQuery(undefined, {
  pollingInterval: 10000,
});
  const currentUserId = data?.user?._id;

  const [likeBlog] = useLikeBlogMutation();
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(likesCount);


  


  // ✅ initialize like state
 useEffect(() => {
  if (
    currentUserId &&
    likes.some((like:any) => (like?.userId?._id)?.toString() === currentUserId.toString())
  ) {
    setLiked(true);
  } else {
    setLiked(false);
  }
}, [likes, currentUserId]);

  // ✅ toggle with backend response
const handleLike = async () => {
  try {
    // ✅ Optimistic update
    setLiked((prev) => !prev);
    setCount((prev) => (liked ? prev - 1 : prev + 1));

    const res = await likeBlog(blogId).unwrap();

    // ✅ Optional: confirm backend count (in case of mismatch)
    if (res?.blogLikes !== undefined) {
      setCount(res.blogLikes);
    }
  } catch (error) {
    console.error("Like failed:", error);

    // ❌ Revert optimistic update if API fails
    setLiked((prev) => !prev);
    setCount((prev) => (liked ? prev + 1 : prev - 1));
  }
};


  return (
    <div className="flex items-center gap-3">
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
    </div>
  );
}
