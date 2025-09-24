'use client'
import { FileText, Edit, Trash2, Eye, Search, Filter, MoreVertical, Calendar, User, ThumbsUp, Bookmark } from "lucide-react";
import {useAllBlogAdminQuery} from '../../Redux/Services/AdminApi'



export default function AllBlogList(){
    const {  data }  = useAllBlogAdminQuery(undefined)

    const blogs = data?.data || [];
    console.log("blogs", blogs)
    return(
    <div>
    <div className="divide-y divide-slate-200">
                {blogs.length === 0 ? (
                    <div className="p-12 text-center">
                    <FileText size={48} className="mx-auto text-slate-300 mb-4" />
                    <p className="text-slate-600">No blogs found matching your criteria</p>
                    </div>
                ) : (
                    blogs.map((blog:any, ) => (
                    <div key={blog._id} className="grid grid-cols-12 gap-4 p-6 hover:bg-slate-50 transition-colors">
                        {/* Blog Info */}
                        <div className="col-span-5">
                        <div className="flex items-start space-x-3">
                            <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-slate-900 mb-1 line-clamp-2">{blog.blogTitle}</h3>
                            <p className="text-slate-600 text-sm mb-2 line-clamp-1">{blog.blogContent}</p>
                            <div className="flex items-center space-x-4 text-xs text-slate-500">
                                <span className="flex items-center">
                                <Calendar size={12} className="mr-1" />
                            {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                    })}
                                </span>
                            </div>
                            </div>
                        </div>
                        </div>
    
                        {/* Author */}
                        <div className="col-span-2 flex items-center">
                        <div className="flex items-center space-x-2">
                            <User size={16} className="text-slate-400" />
                            <span className="text-slate-700">{blog?.userId?.name}</span>
                        </div>
                        </div>
    
                        {/* Status */}
                        <div className="col-span-2 flex items-center">
                          Publishd
                        </div>
    
                        {/* Actions */}
                        <div className="col-span-2 flex items-center justify-end space-x-2">
                        <button
                            className="p-2 text-red-400 hover:text-red-600 transition-colors"
                            title="Delete"
                        >
                            <Trash2 size={16} />
                        </button>
                        </div>
                    </div>
                    ))
                )}
                </div>
        </div>
    )
}