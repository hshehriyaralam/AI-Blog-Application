import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  uid: string;
  email: string;
  name: string;
  profilePic?: string | null;
  role: "author" | "admin";
  blogCount: number;
  isBanned: boolean;
  joiningTime: Date;
  lastSeenAt: Date;
  createdAt: Date;
  updatedAt: Date;
  likedBlogs: Types.ObjectId[];  
  totalLikes: number;
}

const userSchema = new Schema<IUser>(
  {
    uid: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    name: { type: String, required: true },
    profilePic: { type: String, default: null },
    role: {
      type: String,
      enum: ["author", "admin"],
      default: "author",
    },
    blogCount: { type: Number, default: 0 },
    isBanned: { type: Boolean, default: false },
    joiningTime: { type: Date, default: Date.now },
    lastSeenAt: { type: Date, default: Date.now },
    likedBlogs: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
      default: [],
    },
    totalLikes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

userSchema.index({ role: 1 });
userSchema.index({ email: 1});
userSchema.index({ totalLikes: -1 });

userSchema.set("toJSON", {
  transform: (_doc, ret: any) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);
