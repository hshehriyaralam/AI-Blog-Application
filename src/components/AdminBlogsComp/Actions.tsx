'use client'
import { Eye} from "lucide-react";
import Link from "next/link";
import DeleteBlogButton from "./DeleteBlogBtn";



export default function ActionsAdmin({themeValue,blog}:any){
    return(
    <div className="flex items-center space-x-2 md:justify-end">
     <Link href={`/Blogs/${blog._id}`} >
    <button
      className={`p-2 rounded-lg transition-all duration-200  cursor-pointer ${
          themeValue
          ? "bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700"
          : "bg-blue-900/30 hover:bg-blue-900/50 text-blue-400 hover:text-blue-300"
        } group/tooltip relative`}
        title="View Blog"
        >
      <Eye size={20} />
      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap">
        View Blog
      </span>
    </button>
        </Link>   

   <DeleteBlogButton  themeValue={themeValue}  blog={blog} />
  </div>
    )
}