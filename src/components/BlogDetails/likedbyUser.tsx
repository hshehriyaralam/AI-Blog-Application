"use client";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { IUser } from "./LikeButton"; // ✅ same interface import kiya

export default function LikedByUser({
  likedUsers,
}: {
  likedUsers: IUser[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  if (!likedUsers || likedUsers.length === 0) return null;

  const firstUser = likedUsers[0];
  const otherCount = likedUsers.length - 1;

  return (
    <div className="mt-2 text-sm text-gray-700">
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
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        {/* Modal Content */}
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="w-full max-w-sm rounded-2xl bg-white p-4 shadow-lg">
            <Dialog.Title className="text-lg font-bold mb-3">
              Liked by
            </Dialog.Title>

            <div className="space-y-3 max-h-60 overflow-y-auto">
              {likedUsers.map((user, index) => (
                <div
                  key={user._id || index}
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition"
                >
                  <img
                    src={user.profilePic}
                    alt={user.name}
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                  <span className="font-medium">{user.name}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700"
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
