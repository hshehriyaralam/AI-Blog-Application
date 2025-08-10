import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    uid: { 
        type: String,
        required: true,
        unique: true
     },
      // Google UID
    email: { 
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    name: { 
        type: String,
        required: true
    },
    profilePic: { 
        type: String,
        default: null 
    },
    role: {
      type: String,
      enum: ["reader", "author", "admin"],
      default: "reader",
    },
    bio: { 
        type: String,
        default: "" 
    },
    blogCount: {
         type: Number,
         default: 0 
    },
    isBanned: { 
        type: Boolean,
        default: false 
    },
    joiningTime: { 
        type: Date,
        default: Date.now
    },
    lastSeenAt: { 
        type: Date,
        default: Date.now
    },
  },
  {
    timestamps: true, 
  }
);

// indexes for quick searches
userSchema.index({ role: 1 });
userSchema.index({ email: 1 });

export default mongoose.model("User", userSchema);
