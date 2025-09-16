"use client"
import ListeBlogEng from './ListenBlogEng'
import LikeButton from "./LikeButton";
import ShareButton from "./ShareButton";
import BookmarkButton from './BookmarkButton'

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
    <div className="flex items-center justify-between mt-8">
      {/* Listen Button */}
      <ListeBlogEng
        isPlaying={isPlaying}
        blogContent={blogContent}
        blogSummary={blogSummary}
        setCurrentIndex={setCurrentIndex}
        setIsPlaying={setIsPlaying}
      />

      {/* Like / Share / Bookmark */}
      <div className="flex gap-3 sm:gap-4 items-center">
        <LikeButton blogId={blogId} likes={likes} likesCount={likesCount} />
        <ShareButton />
        <BookmarkButton />
      </div>
    </div>
  );
}
