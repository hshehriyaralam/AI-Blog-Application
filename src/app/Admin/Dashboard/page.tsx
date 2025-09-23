'use client'
import Link from "next/link";
import { useState, useEffect } from "react";
import { FileText, Users, ThumbsUp, Bookmark, Eye, Calendar, TrendingUp } from "lucide-react";

// Type definitions
interface DashboardData {
  totalBlogs: number;
  totalLikes: number;
  totalBookmarks: number;
  totalAuthors: number;
  totalViews: number;
  growthRate: number;
}

interface Blog {
  id: number;
  title: string;
  date: string;
  status: 'published' | 'draft';
  views: number;
  author: string;
  likes: number;
}

interface Author {
  id: number;
  name: string;
  email: string;
  blogsCount: number;
  joinDate: string;
  avatar?: string;
}

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalBlogs: 0,
    totalLikes: 0,
    totalBookmarks: 0,
    totalAuthors: 0,
    totalViews: 0,
    growthRate: 0
  });

  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    const loadDashboardData = () => {
      setDashboardData({
        totalBlogs: 42,
        totalLikes: 1280,
        totalBookmarks: 560,
        totalAuthors: 8,
        totalViews: 15420,
        growthRate: 12.5
      });

      setRecentBlogs([
        { id: 1, title: "Getting Started with Next.js 14", date: "2024-01-15", status: "published", views: 320, author: "John Doe", likes: 45 },
        { id: 2, title: "React Hooks Best Practices for 2024", date: "2024-01-12", status: "published", views: 285, author: "Jane Smith", likes: 32 },
        { id: 3, title: "Building a Blog with MongoDB and Next.js", date: "2024-01-10", status: "draft", views: 0, author: "Mike Johnson", likes: 0 },
        { id: 4, title: "CSS Grid vs Flexbox: Complete Guide", date: "2024-01-05", status: "published", views: 412, author: "Sarah Wilson", likes: 67 },
        { id: 5, title: "TypeScript Tips for React Developers", date: "2024-01-03", status: "published", views: 198, author: "Alex Chen", likes: 28 }
      ]);

      setAuthors([
        { id: 1, name: "John Doe", email: "john@example.com", blogsCount: 12, joinDate: "2023-01-15", avatar: "JD" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", blogsCount: 8, joinDate: "2023-02-20", avatar: "JS" },
        { id: 3, name: "Mike Johnson", email: "mike@example.com", blogsCount: 5, joinDate: "2023-03-10", avatar: "MJ" }
      ]);
    };

    loadDashboardData();
  }, []);

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Stats */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
              <p className="text-slate-600 mt-2">Welcome back! Here's your blog performance summary.</p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-2 bg-white rounded-lg px-4 py-2 shadow-sm border border-slate-200">
              <TrendingUp size={18} className="text-green-600" />
              <span className="text-sm font-medium text-slate-700">
                <span className="text-green-600">+{dashboardData.growthRate}%</span> growth this month
              </span>
            </div>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { 
              label: "Total Blogs", 
              value: dashboardData.totalBlogs, 
              icon: FileText, 
              color: "blue",
              description: "Published content",
              trend: "+5 this week"
            },
            { 
              label: "Total Likes", 
              value: dashboardData.totalLikes, 
              icon: ThumbsUp, 
              color: "green",
              description: "User engagement",
              trend: "+128 this week"
            },
            { 
              label: "Total Bookmarks", 
              value: dashboardData.totalBookmarks, 
              icon: Bookmark, 
              color: "purple",
              description: "Saved by users",
              trend: "+42 this week"
            },
            { 
              label: "Total Authors", 
              value: dashboardData.totalAuthors, 
              icon: Users, 
              color: "indigo",
              description: "Active contributors",
              trend: "+2 this month"
            }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-slate-900 mb-2">{formatNumber(stat.value)}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-500">{stat.description}</p>
                    <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      {stat.trend}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl bg-${stat.color}-50 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon size={24} className={`text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          ))}
        </div>

  

        {/* Content Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Recent Blogs */}
          <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-900">Recent Blogs</h2>
                <Link href="/Admin/allBlogs" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
                  View all <span className="ml-1">→</span>
                </Link>
              </div>
            </div>
            <div className="divide-y divide-slate-200">
              {recentBlogs.map((blog) => (
                <div key={blog.id} className="p-6 hover:bg-slate-50 transition-colors duration-200 group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-relaxed">
                        {blog.title}
                      </h3>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-slate-600">
                        <span className="flex items-center">
                          <Users size={14} className="mr-1" />
                          {blog.author}
                        </span>
                        <span className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {formatDate(blog.date)}
                        </span>
                        <span className="flex items-center">
                          <Eye size={14} className="mr-1" />
                          {blog.views} views
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2 ml-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        blog.status === 'published' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {blog.status}
                      </span>
                      <span className="flex items-center text-sm text-slate-600">
                        <ThumbsUp size={14} className="mr-1" />
                        {blog.likes}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Authors & Quick Actions */}
          <div className="space-y-6">
            {/* Top Authors */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-xl font-semibold text-slate-900">Top Authors</h2>
              </div>
              <div className="divide-y divide-slate-200">
                {authors.map((author) => (
                  <div key={author.id} className="p-6 hover:bg-slate-50 transition-colors duration-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-sm">
                        <span className="text-white font-semibold text-sm">
                          {author.avatar}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-900 truncate">{author.name}</h3>
                        <p className="text-sm text-slate-600 truncate">{author.email}</p>
                        <div className="flex items-center space-x-4 mt-1 text-xs text-slate-500">
                          <span>{author.blogsCount} blogs</span>
                          <span>Joined {formatDate(author.joinDate)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-xl font-semibold text-slate-900">Quick Actions</h2>
              </div>
              <div className="p-6 space-y-3">
                {[
                  { href: "/Admin/allBlogs", label: "Manage Blogs", icon: FileText, color: "blue" },
                  { href: "/Admin/allUsers", label: "Manage Users", icon: Users, color: "green" },
                  { href: "/Admin/userLikes", label: "View Likes", icon: ThumbsUp, color: "purple" },
                  { href: "/Admin/userBookmarks", label: "View Bookmarks", icon: Bookmark, color: "indigo" }
                ].map((action, index) => (
                  <Link
                    key={index}
                    href={action.href}
                    className="flex items-center p-3 rounded-lg hover:bg-slate-50 transition-colors duration-200 group"
                  >
                    <div className={`p-2 rounded-lg bg-${action.color}-50 mr-3 group-hover:scale-110 transition-transform`}>
                      <action.icon size={18} className={`text-${action.color}-600`} />
                    </div>
                    <span className={`font-medium text-slate-700 group-hover:text-${action.color}-600 transition-colors`}>
                      {action.label}
                    </span>
                    <span className="ml-auto text-slate-400 group-hover:text-slate-600 transition-colors">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}