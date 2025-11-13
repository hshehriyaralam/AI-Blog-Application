import mongoose, { Schema, Document } from "mongoose";

export interface IBookmark extends Document {
  userId: mongoose.Types.ObjectId;
  blogId: mongoose.Types.ObjectId;
}

const bookmarkSchema: Schema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    blogId: { type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true },
  },
  { timestamps: true }
);

export const Bookmark = mongoose.models.Bookmark ||
  mongoose.model<IBookmark>("Bookmark", bookmarkSchema);
