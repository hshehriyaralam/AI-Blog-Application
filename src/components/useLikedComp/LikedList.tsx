"use client";
import { Heart, Calendar } from "lucide-react";

export default function LikedLists({
  filteredLikes,
  searchQuery,
  themeValue,
  light,
  dark,
}: any) {
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`rounded-2xl shadow-lg border transition-colors duration-300 ${
        themeValue ? `${light} border-gray-200` : `${dark} border-gray-700`
      }`}
    >
      {/* Header */}
      <div
        className={`grid grid-cols-12 gap-4 px-6 py-4 border-b text-sm font-semibold tracking-wide ${
          themeValue
            ? "border-gray-200 text-gray-800 bg-gray-50"
            : "border-gray-700 text-gray-100 bg-gray-800/40"
        }`}
      >
        <div className="col-span-5">User</div>
        <div className="col-span-5">Blog</div>
        <div className="col-span-2 text-right">Liked Date</div>
      </div>

      {/* Body */}
      <div className={`divide-y ${themeValue ? "divide-gray-100" : "divide-gray-700/60"}`}>
        {filteredLikes.length === 0 ? (
          <div className="p-12 text-center">
            <Heart
              size={48}
              className={`mx-auto mb-4 ${
                themeValue ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <p className={themeValue ? "text-gray-600" : "text-gray-400"}>
              {searchQuery
                ? "No likes found matching your search"
                : "No likes data available"}
            </p>
          </div>
        ) : (
          filteredLikes.map((like: any, index: number) => (
            <div
              key={index}
              className={`grid grid-cols-12 gap-4 px-6 py-4 items-center transition-colors duration-200 ${
                themeValue
                  ? "hover:bg-gray-100"
                  : "hover:bg-gray-800/50"
              }`}
            >
              {/* User */}
              <div className="col-span-5 flex items-center space-x-4">
                <div className="relative w-11 h-11">
                  {like.userAvatar ? (
                    <img
                      src={like.userAvatar}
                      alt={like.userName}
                      className="w-11 h-11 rounded-full object-cover border border-gray-300"
                    />
                  ) : (
                    <div
                      className={`w-11 h-11 flex items-center justify-center rounded-full font-semibold ${
                        themeValue
                          ? "bg-gray-200 text-gray-700"
                          : "bg-gray-700 text-gray-300"
                      }`}
                    >
                      {like.userName?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                <div>
                  <h3
                    className={`font-semibold text-sm leading-tight ${
                      themeValue ? "text-gray-900" : "text-gray-100"
                    }`}
                  >
                    {like.userName}
                  </h3>
                  <p
                    className={`text-xs ${
                      themeValue ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    {like.userEmail}
                  </p>
                </div>
              </div>

              {/* Blog */}
              <div className="col-span-5">
                <h4
                  className={`font-medium text-sm line-clamp-1 ${
                    themeValue ? "text-gray-800" : "text-gray-200"
                  }`}
                >
                  {like.blogTitle}
                </h4>
                {like.blogSummary && (
                  <p
                    className={`text-xs mt-1 line-clamp-1 ${
                      themeValue ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    {like.blogSummary}
                  </p>
                )}
              </div>

              {/* Liked Date */}
              <div
                className={`col-span-2 flex items-center justify-end text-xs ${
                  themeValue ? "text-gray-700" : "text-gray-400"
                }`}
              >
                <Calendar size={14} className="mr-2 opacity-70" />
                {formatDate(like.likedAt)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
