import mongoose, { Document, Schema, Types, Model } from "mongoose";

export interface ILike extends Document {
  userId: Types.ObjectId;  
  blogId: Types.ObjectId;  
  createdAt: Date;
}

const likeSchema = new Schema<ILike>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

// 🔒 ek user ek hi blog ko sirf ek baar like kar sake
likeSchema.index({ userId: 1, blogId: 1 }, { unique: true });

// ⚡ efficient queries ke liye indexes
likeSchema.index({ blogId: 1 });
likeSchema.index({ userId: 1 });
likeSchema.index({ createdAt: -1 });

export const Like: Model<ILike> =
  mongoose.models.Like || mongoose.model<ILike>("Like", likeSchema);
