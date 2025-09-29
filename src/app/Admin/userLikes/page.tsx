'use client'
import { useState, useEffect, useContext, useMemo } from "react";
import { Heart, Users, FileText, Eye, Calendar, Search, Filter, ThumbsUp, User, ArrowUpDown } from "lucide-react";
import { ContextTheme } from "../../../Context/DarkTheme";

interface Like {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userAvatar?: string;
  blogId: string;
  blogTitle: string;
  blogAuthor: string;
  blogAuthorId: string;
  likedAt: string;
  likeType: 'like' | 'super_like';
}

export default function UserLikes() {
  const { themeValue, light, dark } = useContext(ContextTheme);
  const [likes, setLikes] = useState<Like[]>([]);
  const [filteredLikes, setFilteredLikes] = useState<Like[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<'recent' | 'user' | 'blog'>('recent');
  const [loading, setLoading] = useState(true);

  // Sample data - Replace with API call
  useEffect(() => {
    const loadLikesData = () => {
      const sampleLikes: Like[] = [
        {
          id: "1",
          userId: "user1",
          userName: "John Doe",
          userEmail: "john@example.com",
          userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
          blogId: "blog1",
          blogTitle: "Getting Started with Next.js 14",
          blogAuthor: "Jane Smith",
          blogAuthorId: "author1",
          likedAt: "2024-01-20T10:30:00Z",
          likeType: 'like'
        },
        {
          id: "2",
          userId: "user2",
          userName: "Mike Johnson",
          userEmail: "mike@example.com",
          userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
          blogId: "blog2",
          blogTitle: "React Hooks Best Practices",
          blogAuthor: "Sarah Wilson",
          blogAuthorId: "author2",
          likedAt: "2024-01-19T15:45:00Z",
          likeType: 'super_like'
        },
        {
          id: "3",
          userId: "user3",
          userName: "Emily Davis",
          userEmail: "emily@example.com",
          userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
          blogId: "blog1",
          blogTitle: "Getting Started with Next.js 14",
          blogAuthor: "Jane Smith",
          blogAuthorId: "author1",
          likedAt: "2024-01-19T09:15:00Z",
          likeType: 'like'
        },
        {
          id: "4",
          userId: "user1",
          userName: "John Doe",
          userEmail: "john@example.com",
          userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
          blogId: "blog3",
          blogTitle: "TypeScript for React Developers",
          blogAuthor: "Alex Chen",
          blogAuthorId: "author3",
          likedAt: "2024-01-18T14:20:00Z",
          likeType: 'like'
        },
        {
          id: "5",
          userId: "user4",
          userName: "David Brown",
          userEmail: "david@example.com",
          userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
          blogId: "blog2",
          blogTitle: "React Hooks Best Practices",
          blogAuthor: "Sarah Wilson",
          blogAuthorId: "author2",
          likedAt: "2024-01-18T11:00:00Z",
          likeType: 'super_like'
        }
      ];

      setLikes(sampleLikes);
      setFilteredLikes(sampleLikes);
      setLoading(false);
    };

    setTimeout(loadLikesData, 1000);
  }, []);

  // Filter and sort likes
  useEffect(() => {
    let result = [...likes];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(like =>
        like.userName.toLowerCase().includes(query) ||
        like.userEmail.toLowerCase().includes(query) ||
        like.blogTitle.toLowerCase().includes(query) ||
        like.blogAuthor.toLowerCase().includes(query)
      );
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.likedAt).getTime() - new Date(a.likedAt).getTime();
        case 'user':
          return a.userName.localeCompare(b.userName);
        case 'blog':
          return a.blogTitle.localeCompare(b.blogTitle);
        default:
          return 0;
      }
    });

    setFilteredLikes(result);
  }, [likes, searchQuery, sortBy]);

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeAgo = (dateString: string): string => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatDate(dateString);
  };

  const getStats = () => {
    const totalLikes = likes.length;
    const uniqueUsers = new Set(likes.map(like => like.userId)).size;
    const uniqueBlogs = new Set(likes.map(like => like.blogId)).size;
    const superLikes = likes.filter(like => like.likeType === 'super_like').length;
    const todayLikes = likes.filter(like => {
      const likeDate = new Date(like.likedAt);
      const today = new Date();
      return likeDate.toDateString() === today.toDateString();
    }).length;

    return { totalLikes, uniqueUsers, uniqueBlogs, superLikes, todayLikes };
  };

  const getTopUsers = () => {
    const userLikes: { [key: string]: { user: Like, count: number } } = {};
    
    likes.forEach(like => {
      if (!userLikes[like.userId]) {
        userLikes[like.userId] = { user: like, count: 0 };
      }
      userLikes[like.userId].count++;
    });

    return Object.values(userLikes)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };

  const getTopBlogs = () => {
    const blogLikes: { [key: string]: { blog: Like, count: number } } = {};
    
    likes.forEach(like => {
      if (!blogLikes[like.blogId]) {
        blogLikes[like.blogId] = { blog: like, count: 0 };
      }
      blogLikes[like.blogId].count++;
    });

    return Object.values(blogLikes)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };

  const stats = getStats();
  const topUsers = getTopUsers();
  const topBlogs = getTopBlogs();

  if (loading) {
    return (
      <div className={`min-h-screen ${themeValue ? light : dark} p-6`}>
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className={`h-8 rounded w-1/4 mb-6 ${themeValue ? 'bg-gray-200' : 'bg-gray-700'}`}></div>
            <div className="grid gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className={`rounded-lg p-6 ${themeValue ? 'bg-white' : 'bg-gray-800'}`}>
                  <div className={`h-4 rounded w-3/4 mb-4 ${themeValue ? 'bg-gray-200' : 'bg-gray-700'}`}></div>
                  <div className={`h-3 rounded w-1/2 ${themeValue ? 'bg-gray-200' : 'bg-gray-700'}`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${themeValue ? light : dark} p-6`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className={`text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent`}>
                User Likes Analytics
              </h1>
              <p className={`mt-2 ${themeValue ? 'text-gray-600' : 'text-gray-300'}`}>
                Monitor user engagement and interaction patterns
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
          <div className={`rounded-xl p-6 shadow-lg border ${
            themeValue ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${themeValue ? 'text-gray-600' : 'text-gray-300'}`}>Total Likes</p>
                <p className={`text-2xl font-bold mt-1 ${themeValue ? 'text-gray-900' : 'text-white'}`}>
                  {stats.totalLikes}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${
                themeValue ? 'bg-pink-50' : 'bg-pink-900/30'
              }`}>
                <Heart size={24} className="text-pink-600" />
              </div>
            </div>
          </div>

          <div className={`rounded-xl p-6 shadow-lg border ${
            themeValue ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${themeValue ? 'text-gray-600' : 'text-gray-300'}`}>Unique Users</p>
                <p className={`text-2xl font-bold mt-1 ${themeValue ? 'text-gray-900' : 'text-white'}`}>
                  {stats.uniqueUsers}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${
                themeValue ? 'bg-blue-50' : 'bg-blue-900/30'
              }`}>
                <Users size={24} className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className={`rounded-xl p-6 shadow-lg border ${
            themeValue ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${themeValue ? 'text-gray-600' : 'text-gray-300'}`}>Blogs Liked</p>
                <p className={`text-2xl font-bold mt-1 ${themeValue ? 'text-gray-900' : 'text-white'}`}>
                  {stats.uniqueBlogs}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${
                themeValue ? 'bg-green-50' : 'bg-green-900/30'
              }`}>
                <FileText size={24} className="text-green-600" />
              </div>
            </div>
          </div>

          <div className={`rounded-xl p-6 shadow-lg border ${
            themeValue ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${themeValue ? 'text-gray-600' : 'text-gray-300'}`}>Super Likes</p>
                <p className={`text-2xl font-bold mt-1 ${themeValue ? 'text-gray-900' : 'text-white'}`}>
                  {stats.superLikes}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${
                themeValue ? 'bg-yellow-50' : 'bg-yellow-900/30'
              }`}>
                <ThumbsUp size={24} className="text-yellow-600" />
              </div>
            </div>
          </div>

          <div className={`rounded-xl p-6 shadow-lg border ${
            themeValue ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${themeValue ? 'text-gray-600' : 'text-gray-300'}`}>Today</p>
                <p className={`text-2xl font-bold mt-1 ${themeValue ? 'text-gray-900' : 'text-white'}`}>
                  {stats.todayLikes}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${
                themeValue ? 'bg-purple-50' : 'bg-purple-900/30'
              }`}>
                <Calendar size={24} className="text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
          {/* Likes List */}
          <div className="xl:col-span-2 space-y-6">
            {/* Filters */}
            <div className={`rounded-xl shadow-lg border ${
              themeValue ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
            } p-6`}>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search size={18} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                    themeValue ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type="text"
                    placeholder="Search users, blogs, authors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      themeValue 
                        ? 'border-gray-300 text-gray-800' 
                        : 'border-gray-600 bg-gray-700 text-white'
                    }`}
                  />
                </div>

                {/* Sort */}
                <div className="flex items-center space-x-4">
                  <span className={`text-sm ${themeValue ? 'text-gray-600' : 'text-gray-300'}`}>
                    Sort by:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className={`px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      themeValue 
                        ? 'border-gray-300 text-gray-800' 
                        : 'border-gray-600 bg-gray-700 text-white'
                    }`}
                  >
                    <option value="recent">Most Recent</option>
                    <option value="user">User Name</option>
                    <option value="blog">Blog Title</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Likes Table */}
            <div className={`rounded-xl shadow-lg border overflow-hidden ${
              themeValue ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
            }`}>
              <div className={`p-6 border-b ${
                themeValue ? 'border-gray-200 bg-gray-50' : 'border-gray-700 bg-gray-900'
              }`}>
                <h3 className={`text-lg font-semibold ${
                  themeValue ? 'text-gray-900' : 'text-white'
                }`}>
                  Recent Likes ({filteredLikes.length})
                </h3>
              </div>

              <div className={`divide-y ${
                themeValue ? 'divide-gray-200' : 'divide-gray-700'
              }`}>
                {filteredLikes.length === 0 ? (
                  <div className="p-8 text-center">
                    <Heart size={48} className={`mx-auto mb-4 ${
                      themeValue ? 'text-gray-300' : 'text-gray-600'
                    }`} />
                    <p className={themeValue ? 'text-gray-600' : 'text-gray-300'}>
                      No likes found matching your criteria
                    </p>
                  </div>
                ) : (
                  filteredLikes.map((like) => (
                    <div
                      key={like.id}
                      className={`p-6 transition-colors duration-200 group ${
                        themeValue 
                          ? 'hover:bg-gray-50' 
                          : 'hover:bg-gray-700/50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-3">
                            <img
                              src={like.userAvatar}
                              alt={like.userName}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                              <h4 className={`font-semibold ${
                                themeValue ? 'text-gray-900' : 'text-white'
                              }`}>
                                {like.userName}
                              </h4>
                              <p className={`text-sm ${
                                themeValue ? 'text-gray-600' : 'text-gray-300'
                              }`}>
                                liked a blog by {like.blogAuthor}
                              </p>
                            </div>
                          </div>

                          <div className={`ml-13 pl-0.5`}>
                            <h5 className={`font-medium mb-1 ${
                              themeValue ? 'text-gray-800' : 'text-gray-200'
                            }`}>
                              "{like.blogTitle}"
                            </h5>
                            <div className="flex items-center space-x-4 text-xs">
                              <span className={`flex items-center ${
                                themeValue ? 'text-gray-500' : 'text-gray-400'
                              }`}>
                                <Calendar size={12} className="mr-1" />
                                {getTimeAgo(like.likedAt)}
                              </span>
                              {like.likeType === 'super_like' && (
                                <span className="flex items-center text-yellow-600">
                                  <ThumbsUp size={12} className="mr-1" />
                                  Super Like
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            className={`p-2 rounded-lg transition-colors ${
                              themeValue
                                ? 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                            }`}
                            title="View Blog"
                          >
                            <Eye size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Analytics */}
          <div className="space-y-6">
            {/* Top Users */}
            <div className={`rounded-xl shadow-lg border ${
              themeValue ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
            } p-6`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                themeValue ? 'text-gray-900' : 'text-white'
              }`}>
                Top Users by Likes
              </h3>
              <div className="space-y-3">
                {topUsers.map((user, index) => (
                  <div key={user.user.userId} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold">
                        {index + 1}
                      </div>
                      <img
                        src={user.user.userAvatar}
                        alt={user.user.userName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className={`font-medium text-sm ${
                          themeValue ? 'text-gray-900' : 'text-white'
                        }`}>
                          {user.user.userName}
                        </p>
                        <p className={`text-xs ${
                          themeValue ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                          {user.count} likes
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Blogs */}
            <div className={`rounded-xl shadow-lg border ${
              themeValue ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
            } p-6`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                themeValue ? 'text-gray-900' : 'text-white'
              }`}>
                Most Liked Blogs
              </h3>
              <div className="space-y-3">
                {topBlogs.map((blog, index) => (
                  <div key={blog.blog.blogId} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 text-xs font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium text-sm truncate ${
                          themeValue ? 'text-gray-900' : 'text-white'
                        }`}>
                          {blog.blog.blogTitle}
                        </p>
                        <p className={`text-xs ${
                          themeValue ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                          by {blog.blog.blogAuthor} • {blog.count} likes
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className={`rounded-xl shadow-lg border ${
              themeValue ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
            } p-6`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                themeValue ? 'text-gray-900' : 'text-white'
              }`}>
                Engagement Insights
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className={themeValue ? 'text-gray-600' : 'text-gray-300'}>Avg. Likes per User</span>
                  <span className={`font-semibold ${themeValue ? 'text-gray-900' : 'text-white'}`}>
                    {(stats.totalLikes / stats.uniqueUsers).toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={themeValue ? 'text-gray-600' : 'text-gray-300'}>Super Like Rate</span>
                  <span className={`font-semibold ${themeValue ? 'text-gray-900' : 'text-white'}`}>
                    {((stats.superLikes / stats.totalLikes) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={themeValue ? 'text-gray-600' : 'text-gray-300'}>Active Today</span>
                  <span className={`font-semibold ${themeValue ? 'text-gray-900' : 'text-white'}`}>
                    {stats.todayLikes}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}