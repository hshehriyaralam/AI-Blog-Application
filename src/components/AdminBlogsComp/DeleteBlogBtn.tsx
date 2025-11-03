'use client'
import { Trash2} from "lucide-react";
import {useDeleteBlogAdminMutation} from "../../Redux/Services/adminApi"
import { useAlert } from '../../Context/AlertContext'
import SingleButtonLoader from '../../components/Common/SingleButtonLoader'

export default function DeleteBlogButton({themeValue,blog}:any){
    const [deleteBlogAdmin, { isLoading }] = useDeleteBlogAdminMutation(undefined)
    const { showAlert } = useAlert()
     const handleDelete = async () => {
      try {
        await deleteBlogAdmin(blog._id).unwrap();
        showAlert('success', 'The blog was successfully deleted by the admin')
      } catch (error) {
        console.error(error);
        showAlert('error', 'The admin failed to delete the blog.')
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
      {isLoading ?  <SingleButtonLoader  />     :  <Trash2 size={20} /> }  
     <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap">
        {isLoading ? "Deleting..." : "Delete Blog"}
      </span>
    </button>
    )
}