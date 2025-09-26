'use client'
import { Trash2} from "lucide-react";
import {useDeleteBlogAdminMutation} from "../../Redux/Services/adminApi"


export default function DeleteBlogButton({themeValue,blog}:any){
    const [deleteBlogAdmin, { isLoading }] = useDeleteBlogAdminMutation();


     const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteBlogAdmin(blog._id).unwrap();
        alert("Blog deleted successfully!");
      } catch (error) {
        console.error(error);
        alert("Failed to delete blog");
      }
    }
  };


    return(
    <button
    onClick={handleDelete}
      className={`p-2 rounded-lg transition-all cursor-pointer duration-200 ${
        themeValue
          ? "bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700"
          : "bg-red-900/30 hover:bg-red-900/50 text-red-400 hover:text-red-300"
      } group/tooltip relative`}
      
      title="Delete Blog"
    >
      <Trash2 size={20} />
     <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap">
        {isLoading ? "Deleting..." : "Delete Blog"}
      </span>
    </button>
    )
}