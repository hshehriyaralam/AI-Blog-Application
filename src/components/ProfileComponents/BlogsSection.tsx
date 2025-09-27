'use client'
import { Trash2  } from "lucide-react";
import { Button } from "../ui/button";
import  SingleButtonLoader from '../../components/Common/SingleButtonLoader'



export default function ProfileBlogsSections({themeValue,dark,blog,light, handleDeleteBlog,deletingId}:any){
    return(
<div className={`rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
    themeValue ? `${light} border border-gray-200` : `${dark} border border-gray-700`
    }`}>
    {/* Blog Image */}
    <div className="relative h-48 overflow-hidden">
        <img
        src={blog.blogImage}
        alt={blog.blogTitle}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
    </div>

    {/* Content */}
    <div className="p-5">
        <h3 className={`font-semibold mb-2 text-lg ${themeValue ? 'text-gray-800' : 'text-white'}`}>
        {blog.blogTitle}
        </h3>
        <p className={`text-sm mb-3 line-clamp-2 ${themeValue ? 'text-gray-600' : 'text-gray-300'}`}>
        {blog.blogSummary}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <span className="text-xs text-gray-500">
            {new Date(blog.createdAt).toLocaleDateString()}
        </span>
        <Button
            variant="ghost"
            size="sm"
            className={`${themeValue ? 'text-red-600 hover:text-red-700 hover:bg-red-50' : 'text-red-600  hover:text-red-500   '}   cursor-pointer `}
            onClick={(e) => {
            e.preventDefault();
            handleDeleteBlog(blog._id);
            }}
             disabled={deletingId === blog._id}>
            {deletingId === blog._id ?  <SingleButtonLoader />   : <Trash2 className="w-4 h-4" />}
        </Button>
        </div>
    </div>
    </div>
    )
}