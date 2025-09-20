'use client'
import { Bookmark } from "lucide-react";
import {useGetBookmarksQuery, useToggleBookmarkMutation} from '../../Redux/Services/bookmarkApi'


export default function BookmarkButton({blogId}:any){
    const { data: bookmarks } = useGetBookmarksQuery();
  const [toggleBookmark] = useToggleBookmarkMutation();

  const isBookmarked = bookmarks?.bookmarks?.some(
    (b: any) => b.blogId._id === blogId
  );

  const handleBookmark = async () => {
    await toggleBookmark({ blogId });
  };

    return(
          <button
          onClick={handleBookmark}
          className="p-2 sm:p-2.5 rounded-full bg-amber-100  
          hover:bg-amber-200  transition-all shadow-md hover:scale-110 cursor-pointer ">
          {/* <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 " /> */}
{isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
        </button>
    )
}