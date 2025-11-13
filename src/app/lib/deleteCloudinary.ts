import { v2 as cloudinary } from "cloudinary";

export async function deleteFromCloudinary(imageUrl: string) {
  try {
    // Extract public_id from image URL
    const publicId = imageUrl.split("/").slice(-2).join("/").split(".")[0]; 
    // Example: blog_image/abcxyz123

    await cloudinary.uploader.destroy(publicId);
    console.log("🧹 Deleted from Cloudinary:", publicId);
  } catch (error) {
    console.error("Cloudinary delete error:", error);
  }
}
