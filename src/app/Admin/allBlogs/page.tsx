'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { FileText, Edit, Trash2, Eye, Search, Filter, MoreVertical, Calendar, User, ThumbsUp, Bookmark } from "lucide-react";
import {useAllBlogAdminQuery} from '../../../Redux/Services/AdminApi'
import AllBlogList  from '../../../components/AdminBlogsComp/BlogsList'

interface Blog {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  status: 'published' | 'draft';
  views: number;
  likes: number;
  bookmarks: number;
  category: string;
  readTime: string;
}

export default function UserAllBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [loading, setLoading] = useState(true);
  const [selectedBlogs, setSelectedBlogs] = useState<number[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<number | null>(null);
  const {  data }  = useAllBlogAdminQuery(undefined)
  console.log("Admin Blogs", data?.data)

  // Sample data - Replace with API call
  useEffect(() => {
    const loadBlogs = () => {
      const sampleBlogs: Blog[] = [
        {
          id: 1,
          title: "Getting Started with Next.js 14",
          excerpt: "Learn how to build modern web applications with Next.js 14 and React...",
          author: "John Doe",
          date: "2024-01-15",
          status: "published",
          views: 1542,
          likes: 128,
          bookmarks: 45,
          category: "Web Development",
          readTime: "8 min"
        },
        {
          id: 2,
          title: "React Hooks Best Practices",
          excerpt: "Master React Hooks with these professional tips and patterns...",
          author: "Jane Smith",
          date: "2024-01-12",
          status: "published",
          views: 892,
          likes: 67,
          bookmarks: 23,
          category: "React",
          readTime: "6 min"
        },
        {
          id: 3,
          title: "Building a Blog with MongoDB",
          excerpt: "Complete guide to creating a full-stack blog application...",
          author: "Mike Johnson",
          date: "2024-01-10",
          status: "draft",
          views: 0,
          likes: 0,
          bookmarks: 0,
          category: "Full Stack",
          readTime: "12 min"
        },
        {
          id: 4,
          title: "CSS Grid vs Flexbox",
          excerpt: "When to use CSS Grid and when to stick with Flexbox...",
          author: "Sarah Wilson",
          date: "2024-01-08",
          status: "published",
          views: 1245,
          likes: 89,
          bookmarks: 34,
          category: "CSS",
          readTime: "5 min"
        },
        {
          id: 5,
          title: "TypeScript for React Developers",
          excerpt: "Improve your React codebase with TypeScript...",
          author: "Alex Chen",
          date: "2024-01-05",
          status: "published",
          views: 756,
          likes: 45,
          bookmarks: 18,
          category: "TypeScript",
          readTime: "10 min"
        },
        {
          id: 6,
          title: "Node.js Performance Optimization",
          excerpt: "Advanced techniques to optimize your Node.js applications...",
          author: "David Brown",
          date: "2024-01-03",
          status: "draft",
          views: 0,
          likes: 0,
          bookmarks: 0,
          category: "Backend",
          readTime: "15 min"
        }
      ];

      setBlogs(sampleBlogs);
      setFilteredBlogs(sampleBlogs);
      setLoading(false);
    };

    setTimeout(loadBlogs, 1000); // Simulate API delay
  }, []);

  // Filter blogs based on search and status
  useEffect(() => {
    let result = blogs;

    if (searchTerm) {
      result = result.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      result = result.filter(blog => blog.status === statusFilter);
    }

    setFilteredBlogs(result);
  }, [searchTerm, statusFilter, blogs]);

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDeleteClick = (blogId: number) => {
    setBlogToDelete(blogId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (blogToDelete) {
      setBlogs(blogs.filter(blog => blog.id !== blogToDelete));
      setSelectedBlogs(selectedBlogs.filter(id => id !== blogToDelete));
      setShowDeleteModal(false);
      setBlogToDelete(null);
    }
  };

  const toggleSelectBlog = (blogId: number) => {
    setSelectedBlogs(prev =>
      prev.includes(blogId)
        ? prev.filter(id => id !== blogId)
        : [...prev, blogId]
    );
  };

  const toggleSelectAll = () => {
    setSelectedBlogs(selectedBlogs.length === filteredBlogs.length ? [] : filteredBlogs.map(blog => blog.id));
  };

  const deleteSelectedBlogs = () => {
    setBlogs(blogs.filter(blog => !selectedBlogs.includes(blog.id)));
    setSelectedBlogs([]);
  };

  const getStatusBadge = (status: 'published' | 'draft') => {
    const styles = {
      published: "bg-green-100 text-green-800 border-green-200",
      draft: "bg-yellow-100 text-yellow-800 border-yellow-200"
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-1/4 mb-6"></div>
            <div className="grid gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="h-4 bg-slate-200 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">All Blogs</h1>
              <p className="text-slate-600 mt-2">Manage and monitor all blog posts</p>
            </div>
            <Link
              href="/Admin/allBlogs/new"
              className="mt-4 sm:mt-0 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
            >
              <FileText size={18} className="mr-2" />
              Write New Blog
            </Link>
          </div>
        </div>


        {/* Blogs Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-6 border-b border-slate-200 bg-slate-50 font-semibold text-slate-900 text-sm">
            <div className="col-span-1 flex items-center">
              <input
                type="checkbox"
                checked={selectedBlogs.length === filteredBlogs.length && filteredBlogs.length > 0}
                onChange={toggleSelectAll}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
            </div>
            <div className="col-span-5">Blog Post</div>
            <div className="col-span-2">Author</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {/* Table Body */}
          <AllBlogList />
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Blogs</p>
                <p className="text-2xl font-bold text-slate-900">{blogs.length}</p>
              </div>
              <FileText size={24} className="text-indigo-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Published</p>
                <p className="text-2xl font-bold text-slate-900">
                  {blogs.filter(b => b.status === 'published').length}
                </p>
              </div>
              <Eye size={24} className="text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Drafts</p>
                <p className="text-2xl font-bold text-slate-900">
                  {blogs.filter(b => b.status === 'draft').length}
                </p>
              </div>
              <FileText size={24} className="text-yellow-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Views</p>
                <p className="text-2xl font-bold text-slate-900">
                  {blogs.reduce((sum, blog) => sum + blog.views, 0).toLocaleString()}
                </p>
              </div>
              <Eye size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Delete Blog</h3>
            <p className="text-slate-600 mb-6">
              Are you sure you want to delete this blog? This action cannot be undone.
            </p>
            <div className="flex space-x-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete Blog
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}