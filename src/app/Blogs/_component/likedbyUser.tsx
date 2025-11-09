"use client";
import { useState, useContext } from "react";
import { Dialog } from "@headlessui/react";
import { IUser } from "./LikeButton";
import { ContextTheme } from "../../../Context/DarkTheme";
import Link from "next/link";
import { User } from "lucide-react";

export default function LikedByUser({ likedUsers }: { likedUsers: IUser[] }) {
  const { themeValue } = useContext(ContextTheme);
  const [isOpen, setIsOpen] = useState(false);
  const [imgError, setImgError] = useState(false);


  const likedByUser = likedUsers.map((like: any) => like.userId).filter(Boolean);

  if (!likedByUser || likedByUser.length === 0) {
    return (
      <div
        className={`text-[8px] md:text-[12px] ${
          themeValue ? "text-gray-500" : "text-gray-400"
        }`}
      >
        No likes yet
      </div>
    );
  }

  const firstUser = likedByUser[0];
  const otherCount = likedByUser.length - 1;

  return (
    <div
      className={`text-[8px] md:text-[12px] ${
        themeValue ? "text-gray-700" : "text-gray-300"
      }`}
    >
      <span>
        Liked by{" "}
        <button
          onClick={() => setIsOpen(true)}
          className="font-semibold hover:underline"
        >
          {firstUser.name}
        </button>{" "}
        {otherCount > 0 && (
          <span>
            and{" "}
            <button
              onClick={() => setIsOpen(true)}
              className="font-semibold hover:underline"
            >
              {otherCount} others
            </button>
          </span>
        )}
      </span>

      {/* Modal */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel
            className={`w-full max-w-xs sm:max-w-sm rounded-xl shadow-lg p-4 border transition ${
              themeValue
                ? "bg-white text-gray-900 border-gray-300"
                : "bg-black text-gray-100 border-gray-800"
            }`}
          >
            <Dialog.Title className="text-base sm:text-lg font-bold mb-3">
              Liked by
            </Dialog.Title>

            <div className="space-y-2 sm:space-y-3 max-h-48 sm:max-h-60 overflow-y-auto">
              {likedByUser.map((user, index) => {
                const hasImage =
                  user.profilePic && user.profilePic.trim() !== "" && !imgError;
                return (
                  <Link
                    key={user.id || index}
                    href={`/Authors/${user.id}`}
                    className={`flex items-center gap-3 p-2 rounded-md transition ${
                      themeValue ? "hover:bg-gray-100" : "hover:bg-gray-900"
                    }`}
                  >
                    {hasImage ? (
                      <img
                        src={user.profilePic}
                        alt={user.name}
                        width={28}
                        height={28}
                        className="rounded-full object-cover"
                        onError={() => setImgError(true)}
                      />
                    ) : (
                      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-300">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                    )}
                    <span className="font-medium text-sm sm:text-base">{user.name}</span>
                  </Link>
                );
              })}
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-purple-600 cursor-pointer text-white py-1.5 sm:py-2 rounded-lg text-sm sm:text-base"
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
