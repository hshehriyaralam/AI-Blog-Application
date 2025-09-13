"use client"
import ListeBlogEng from './ListenBlogEng'
import LikeButton from "./LikeButton";
import ShareButton from "./ShareButton";
import BookmarkButton from './BookmarkButton'
export default function ActionRow({
  blogContent,
  blogSummary,
  isPlaying,
  setIsPlaying,
  setCurrentIndex,
}: {
  blogContent: string;
  blogSummary?: string;
  isPlaying: boolean;
  setIsPlaying: (v: boolean) => void;
  setCurrentIndex: (v: { section: string; index: number | null }) => void;
}) {
  return (
    <div className="flex items-center justify-between mt-8">
      {/* Listen Button */}
      <ListeBlogEng
        isPlaying={isPlaying}
        blogContent={blogContent}
        blogSummary={blogSummary}x
        setCurrentIndex={setCurrentIndex}
        setIsPlaying={setIsPlaying}/>
      {/* Like / Share / Bookmark */}
      <div className="flex gap-3 sm:gap-4">
        <LikeButton />
        <ShareButton />
        <BookmarkButton />
      </div>
    </div>
  );
}
