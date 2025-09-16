"use client"
import ListeBlogEng from './ListenBlogEng'
import LikeButton from "./LikeButton";
import ShareButton from "./ShareButton";
import BookmarkButton from './BookmarkButton'
import LikedByUser from './likedbyUser';

interface User {
  id: string;
  name: string;
  profilePic: string;
}

export default function ActionRow({
  blogContent,
  blogSummary,
  isPlaying,
  setIsPlaying,
  setCurrentIndex,
  blogId,
  likes,
  likesCount,
}: {
  blogContent: string;
  blogSummary?: string;
  isPlaying: boolean;
  setIsPlaying: (v: boolean) => void;
  setCurrentIndex: (v: { section: string; index: number | null }) => void;
  blogId: string;
  likes: User[]
  likesCount: number;
}) {
  return (
    <div className="mt-8">
      {/* Main Row - Listen Button + Action Buttons */}
      <div className="flex flex-row items-center justify-between gap-4 w-full">
        
        {/* 🎧 Listen Button */}
        <div className="flex-1 min-w-0">
          <ListeBlogEng
            isPlaying={isPlaying}
            blogContent={blogContent}
            blogSummary={blogSummary}
            setCurrentIndex={setCurrentIndex}
            setIsPlaying={setIsPlaying}
          />
        </div>

        {/* ❤️ Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <LikeButton blogId={blogId} likes={likes} likesCount={likesCount} />
          <ShareButton />
          <BookmarkButton />
        </div>
      </div>

      {/* ✅ LikedByUser - Always below both sections */}
      <div className="mt-3 w-full text-end">
        <LikedByUser likedUsers={likes} />
      </div>
    </div>
  );
}