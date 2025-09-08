'use client'
import { useFetchBlogQuery } from "../../Redux/Services/blogApi"; 
import { ContextTheme } from '../../Context/DarkTheme'
import { useContext, useState } from 'react';
import BlogCard from "../../components/BlogsComponents/BLogCard";

// Components
import SearchInput from '../../components/BlogsComponents/SearchINput'
import FilterToogle from '../../components/BlogsComponents/FilterToggle'
import AuthorsFilter from '../../components/BlogsComponents/AuthorsFilter'
import TitleFilter from '../../components/BlogsComponents/TitleFilter'
import DateFilter from "../../components/BlogsComponents/DateFilter";
import Tags from '../../components/BlogsComponents/TagsFilter'
import FilterActions from '../../components/BlogsComponents/FilterActions'


export default function AllBlogs() {
  const { data, isLoading } = useFetchBlogQuery([]);
  const { themeValue, light, dark, lightText, DarkText } = useContext(ContextTheme);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("")

  const blogsCreateDates = data?.data?.map((blog: any) => {
  return new Date(blog.createdAt).toDateString();
});

  const BlogsDate = [...new Set(blogsCreateDates)]







  // filter Blogs
  const filteredBlogs = data?.data?.filter((blog: any) => {
  const query = searchQuery.toLowerCase();
  return (
    blog.blogTitle.toLowerCase().includes(query) ||
    blog.blogContent.toLowerCase().includes(query) ||
    blog.userId?.name?.toLowerCase().includes(query)
  );
});


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
            <SearchInput   
            themeValue={themeValue}
            light={light}
            dark={dark}
            value={searchQuery}
            onChange={(e: any) => setSearchQuery(e.target.value)}
            />

            {/* Filter Toggle */}
            <FilterToogle  
            onClick={() => setShowFilters(!showFilters)}
            showFilters={showFilters}
            />
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-500">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Author Filter */}
                <AuthorsFilter 
                themeValue={themeValue}
                light={light}
                dark={dark}
                />
                {/* Title Filter */}

                <TitleFilter 
                themeValue={themeValue}
                light={light}
                dark={dark}
                />

                {/* Date Filter */}
                <DateFilter 
                themeValue={themeValue}
                light={light}
                dark={dark}
                BlogsDate={BlogsDate}
                />

                {/* Tags Filter */}
                <Tags 
                themeValue={themeValue}
                light={light}
                dark={dark}
                />
              </div>
              {/* Filter Actions */}
              <FilterActions 
               themeValue={themeValue}
                light={light}
                dark={dark} />
            </div>
          )}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       {filteredBlogs?.map((blog: any, index: number) => {
        const isFeatured = index % 6 === 0;
        return (
          <div key={blog._id} className={`border ${isFeatured ? 'lg:col-span-2' : ''} ${themeValue ? `${light}  border-gray-200 ` : `${dark} border-gray-700 `} rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer `}>
            <BlogCard 
              blog={blog}
              isFeatured={isFeatured}
              themeValue={themeValue}
              lightText={lightText}
              DarkText={DarkText}
              isLoading={isLoading} />
          </div>        
        );
      })}
        </div>
      </div>
    </div>
  );
}