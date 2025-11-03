import mongoose, { Document, Schema, Types } from "mongoose";

export interface IBlog extends Document {
  _id: Types.ObjectId;
  blogTitle: string;
  blogContent: string;
  blogSummary: string;
  blogTags: string[];
  blogImage: string;
  likes: Types.ObjectId[];   
  likesCount: number;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new Schema<IBlog>(
  {
    blogTitle: { type: String, required: true },
    blogContent: { type: String, required: true },
    blogSummary: { type: String, required: true },
    blogTags: { type: [String], required: true, default: [] },
    blogImage: { type: String, required: true },
    likes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
      default: [],
    },
    likesCount: { type: Number, default: 0 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

blogSchema.index({ likesCount: -1 });
blogSchema.index({ userId: 1, createdAt: -1 });

export const Blogs =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", blogSchema);
