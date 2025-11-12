export interface AdminBlog {
  _id: string;
  blogTitle: string;
  blogContent: string;
  blogImage?: string;
  status: "published" | "draft";
  createdAt: string;
  userId: {
    name: string;
    profilePic?: string;
  };
}


 export interface AdminUser {
  id: string;
  name: string;
  email: string;
  profilePic?: string;
  role: 'admin' | 'author' | 'user';
  isBanned: boolean;
  blogCount: number;
  totalLikes: number;
  joiningTime: string;
  lastSeenAt: string;
  bio?: string;
  isAdmin: boolean;
}


export interface LikeData {
  userName: string;
  userEmail: string;
  userProfile?: string;
  blogTitle: string;
  likedAt: string;
  blogImage? : string;
  blogSummary? : string;
}