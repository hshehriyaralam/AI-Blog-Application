'use client'
import { useFetchBlogQuery } from "../../Redux/Services/blogApi"; 
import { ContextTheme } from '../../Context/DarkTheme'
import { useContext, useState } from 'react';
import BlogCard from "../../components/BlogsComponents/BLogCard";
import { Search, Filter, Calendar, User, Tag, ArrowDown, Grid, List } from "lucide-react";

export default function AllBlogs() {
  const { data, isLoading } = useFetchBlogQuery([]);
  const { themeValue, light, dark, lightText, DarkText } = useContext(ContextTheme);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className={`min-h-screen ${themeValue ? `${light}` : `${dark}`} py-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
           <div className="max-w-6xl mx-auto text-center mb-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
         Discover Amazing Content
        </h1>
        <p className={`text-lg ${themeValue ? "text-gray-600" : "text-gray-400"} max-w-2xl mx-auto`}>
          Explore our collection of insightful articles, tutorials, and stories from talented writers around the world.
        </p>
      </div>

         

        {/* Filters and Search Section */}
        <div className={`mb-4 rounded-xl ${themeValue ? `${light} shadow-md` : `${dark} shadow-xl `} p-6`}>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search blogs by title, content, or author..."
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  themeValue 
                    ? `${light} border-gray-300 text-gray-800 placeholder-gray-800` 
                    : `${dark} border-gray-600 text-gray-200 placeholder-gray-800`
                } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
              />
            </div>



            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg  cursor-pointer
                bg-gradient-to-r from-indigo-500 to-purple-600 text-white
                rounded-lg text-sm font-medium hover:from-indigo-600 hover:to-purple-700 transition-all`}
            >
              <Filter size={18} />
              Filters
              <ArrowDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Author Filter */}
                <div>
                  <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${themeValue ? 'text-gray-700' : 'text-gray-300'}`}>
                    <User size={16} />
                    Author
                  </label>
                  <select className={`w-full px-3 py-2 rounded-lg border ${
                    themeValue 
                      ? `${light} border-gray-300 text-gray-800` 
                      : `${dark} border-gray-600 text-white`
                  }`}>
                    <option value="">All Authors</option>
                    <option value="author1">John Doe</option>
                    <option value="author2">Jane Smith</option>
                  </select>
                </div>

                {/* Title Filter */}
                <div>
                  <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${themeValue ? 'text-gray-700' : 'text-gray-300'}`}>
                    <Search size={16} />
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Filter by title..."
                    className={`w-full px-3 py-2 rounded-lg border ${
                      themeValue 
                        ? `${light} border-gray-300 text-gray-800`
                        : `${dark} border-gray-600 text-white`
                    }`}
                  />
                </div>

                {/* Date Filter */}
                <div>
                  <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${themeValue ? 'text-gray-700' : 'text-gray-300'}`}>
                    <Calendar size={16} />
                    Date
                  </label>
                  <select className={`w-full px-3 py-2 rounded-lg border ${
                    themeValue 
                      ? `${light} border-gray-300 text-gray-800` 
                      : `${dark} border-gray-600 text-white`
                  }`}>
                    <option value="">All Time</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="year">This Year</option>
                  </select>
                </div>

                {/* Tags Filter */}
                <div>
                  <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${themeValue ? 'text-gray-700' : 'text-gray-300'}`}>
                    <Tag size={16} />
                    Tags
                  </label>
                  <select className={`w-full px-3 py-2 rounded-lg border ${
                    themeValue 
                      ? `${light} border-gray-300 text-gray-800` 
                      : `${dark} border-gray-600 text-white`
                  }`}>
                    <option value="">All Tags</option>
                    <option value="technology">Technology</option>
                    <option value="design">Design</option>
                    <option value="business">Business</option>
                  </select>
                </div>
              </div>

              {/* Filter Actions */}
              <div className="flex gap-3 mt-4 justify-end">
                <button className={`px-4 py-2 rounded-lg border cursor-pointer ${
                  themeValue 
                    ? 'border-gray-300 text-gray-700 hover:bg-gray-50' 
                    : 'border-gray-600 text-gray-300 hover:bg-gray-700'
                }`}>
                  Clear All
                </button>
                <button className={`px-4 py-2 rounded-lg  
                bg-gradient-to-r from-indigo-500 to-purple-600 text-white
                rounded-lg text-sm font-medium hover:from-indigo-600 hover:to-purple-700 transition-all
                cursor-pointer
                `}>
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data?.map((blog: any, index: number) => {
            const isFeatured = index % 6 === 0;


            return (
              <div
                key={blog._id}
                className={`
              border
              ${isFeatured ? 'lg:col-span-2' : ''}
              ${themeValue ? `${light}  border-gray-200 ` : `${dark} border-gray-700 `} 
              rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300
              hover:scale-[1.02] cursor-pointer 
            `}
              >
                <BlogCard 
                   blog={blog}
                  isFeatured={isFeatured}
                  themeValue={themeValue}
                  lightText={lightText}
                  DarkText={DarkText}
                  isLoading={isLoading}
                />
              </div>        
            );
          })}
        </div>
      </div>
    </div>
  );
}