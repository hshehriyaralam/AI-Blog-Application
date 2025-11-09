"use client";
import { ContextTheme } from "../../Context/DarkTheme"
import { useGetBookmarksQuery } from "../../Redux/Services/bookmarkApi";
import Link from "next/link";
import { FileText } from "lucide-react";
import { useState, useContext } from "react";
import { Button } from "../../components/ui/button";
import CollectionsBlogCard from '../../components/CollectionsComponents/BlogCard'
import LoadingPage from "../../components/layout/LoadingPage";

export default function Collection() {
  const { data, isLoading, isError } = useGetBookmarksQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  console.log("Bookmarks Data:", data);
  const [imgError, setImgError] = useState(false);
  const { themeValue, light, dark, lightText, DarkText } = useContext(ContextTheme);

  if (isLoading) return <LoadingPage />
  
  if (isError) return (
    <div className={`min-h-screen flex items-center justify-center ${themeValue ? light : dark}`}>
      <div className="text-center"> 
        <p className="text-red-500 text-lg mb-4">Failed to load bookmarks</p>
        <Button 
          onClick={() => window.location.reload()} 
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          Try Again
        </Button>
      </div>
    </div>
  );

  const bookmarks = data?.bookmarks || [];

  return (
    <div className={`min-h-screen ${themeValue ? `${light}` :  `${dark}`} py-8`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
              Discover Your Saved Collections
            </h1>
          <p className={`lg:text-lg  text-md   ${themeValue ? "text-gray-600" : "text-gray-400"} 
            lg:max-w-[450px]  max-w-[300px]   mx-auto  my-2 `}>
            A curated space where all your saved articles, ideas, and inspirations live together.
          </p>
        </div>

        {bookmarks.length === 0 ? (
          <div className={`text-center py-16 rounded-2xl ${themeValue ? `${light} shadow-lg` :  `${dark}bg-gray-800 shadow-xl`}`}>
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className={`text-xl font-semibold mb-2 ${themeValue ? 'text-gray-800' : 'text-white'}`}>
              No collections yet
            </h2>
            <p className={`mb-6 ${themeValue ? 'text-gray-600' : 'text-gray-400'}`}>
              Start saving articles to see them here
            </p>
            <Link   href={`/Blogs`}>
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white  cursor-pointer"  >
              Explore Articles
            </Button>
            </Link>
          </div>
        ) : (
          <>

            {/* Bookmarks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarks.map((bookmark: any) => {
                const blog = bookmark.blogId;
                const hasImage = blog?.userId?.profilePic && blog.userId.profilePic.trim() !== "" && !imgError;


                return (
                  <div
                    key={blog._id}
                    className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
                      themeValue ? 'bg-white border border-gray-200' : 'bg-gray-800 border border-gray-700'
                    }`}
                  >
                    <CollectionsBlogCard 
                    bookmark={bookmark}
                    blog={blog}
                    setImgError={setImgError}
                    hasImage={hasImage}
                    themeValue={themeValue}
                    light={light}
                    dark={dark}
                    />
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}