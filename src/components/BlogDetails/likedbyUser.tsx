"use client";
import { useState, useContext } from "react";
import { Dialog } from "@headlessui/react";
import { IUser } from "./LikeButton";
import { ContextTheme } from "../../Context/DarkTheme";
import Link from "next/link";

export default function LikedByUser({
  likedUsers,
}: {
  likedUsers: IUser[];
}) {
  const { themeValue, light, dark } = useContext(ContextTheme);
  const [isOpen, setIsOpen] = useState(false);

  if (!likedUsers || likedUsers.length === 0) return null;

  const firstUser = likedUsers[0];
  const otherCount = likedUsers.length - 1;

  return (
    <div
      className={`mt-2 text-sm ${
        themeValue  ? "text-gray-700" : "text-gray-300"
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

      {/* Popup / Modal */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        {/* Overlay */}
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />

        {/* Modal Content */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel
            className={`w-full max-w-xs sm:max-w-sm rounded-xl shadow-lg p-4 transition 
              ${
                themeValue 
                  ?  "bg-white text-gray-900" 
                  : "bg-gray-900 text-gray-100"
              }`}
          >
            <Dialog.Title className="text-base sm:text-lg font-bold mb-3">
              Liked by
            </Dialog.Title>

            <div className="space-y-2 sm:space-y-3 max-h-48 sm:max-h-60 overflow-y-auto">
              {likedUsers.map((user, index) => (
                <div   key={user.id || index}>               
                <Link href={`/Authors/${user.id}`}
                  className={`flex items-center gap-3 p-2 rounded-md transition 
                    ${
                      themeValue 
                        ? "hover:bg-gray-100"
                        : "hover:bg-black"
                    }`}
                >
                  <img
                    src={user.profilePic}
                    alt={user.name}
                    width={28}
                    height={28}
                    className="rounded-full object-cover"
                  />
                  <span className="font-medium text-sm sm:text-base">
                    {user.name}
                  </span>
                </Link>
                 </div>
              ))}
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 w-full bg-pink-600 text-white py-1.5 sm:py-2 rounded-lg hover:bg-pink-700 text-sm sm:text-base"
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
