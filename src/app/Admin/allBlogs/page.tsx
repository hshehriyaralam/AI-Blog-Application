"use client";
import { useState, useContext, useMemo } from "react";
import { useAllBlogAdminQuery } from "../../../Redux/Services/adminApi";
import AllBlogList from "../../../components/AdminBlogsComp/BlogsList";
import LoadingPage from "../../../components/layout/LoadingPage";
import { ContextTheme } from "../../../Context/DarkTheme";
import AllFiltersBlogs from "../../../components/AdminBlogsComp/AllFilters";


type DraftFilters = {
  authorId: string;
  title: string;
  date: string;
  tag: string;
};

export default function UserAllBlogs() {
  const { data, isLoading } = useAllBlogAdminQuery(undefined);
  const { themeValue, light, dark } = useContext(ContextTheme);

  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [draftFilters, setDraftFilters] = useState<DraftFilters>({
    authorId: "",
    title: "",
    date: "",
    tag: "",
  });
  const [appliedFilters, setAppliedFilters] = useState<DraftFilters>(draftFilters);

  // Unique dates
  const blogsCreateDates: string[] = useMemo(() => {
    const list =
      data?.data
        ?.map((blog: any) =>
          blog?.createdAt ? new Date(blog.createdAt).toDateString() : ""
        )
        .filter(Boolean) || [];
    return Array.from(new Set(list));
  }, [data]);

  const handleApply = () => {
    setAppliedFilters({ ...draftFilters });
  };

  const handleClear = () => {
    const empty: DraftFilters = { authorId: "", title: "", date: "", tag: "" };
    setDraftFilters(empty);
    setAppliedFilters(empty);
    setSearchQuery("");
  };

  // Filtered blogs
  const filteredBlogs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return (data?.data || []).filter((blog: any) => {
      let ok = true;

      if (q) {
        const title = blog?.blogTitle?.toLowerCase() || "";
        const content = blog?.blogContent?.toLowerCase() || "";
        const authorName = blog?.userId?.name?.toLowerCase?.() || "";
        ok =
          ok &&
          (title.includes(q) ||
            content.includes(q) ||
            authorName.includes(q));
      }

      if (appliedFilters.authorId) {
        const blogAuthorId =
          typeof blog?.userId === "object" ? blog?.userId?.id : blog?.userId;
        ok = ok && String(blogAuthorId || "") === String(appliedFilters.authorId);
      }

      if (appliedFilters.date) {
        const d = blog?.createdAt
          ? new Date(blog.createdAt).toDateString()
          : "";
        ok = ok && d === appliedFilters.date;
      }

      if (appliedFilters.tag) {
        const tags: string[] =
          blog?.blogTags?.map((t: string) => t.toLowerCase()) || [];
        ok = ok && tags.includes(appliedFilters.tag.toLowerCase());
      }

      return ok;
    });
  }, [data, searchQuery, appliedFilters]);

  if (isLoading) return <LoadingPage />;

  return (
    <div className={`min-h-screen ${themeValue ? light : dark} p-2`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className={`text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent`}>
                All Blogs
              </h1>
              <p className={`mt-2 ${themeValue ? 'text-gray-600' : 'text-gray-300'}`}>
                Monitor, filter and manage all blogs from a single dashboard
              </p>
            </div>
          </div>
        </div>
        {/* Filters Section */}
        < AllFiltersBlogs  
        data={data}
        setDraftFilters={setDraftFilters}
        setAppliedFilters={setAppliedFilters}
        setSearchQuery={setSearchQuery}
        draftFilters={draftFilters}
        searchQuery={searchQuery}
        setShowFilters={setShowFilters}
        showFilters={showFilters}
         />
        {/* Results Info */}
        <div className={`mb-4 flex items-center justify-between ${
          themeValue ? 'text-gray-600' : 'text-gray-300'
        }`}>
          <p className="text-sm">
            Showing <span className="font-semibold text-indigo-600">{filteredBlogs.length}</span> of{" "}
            <span className="font-semibold">{data?.data?.length || 0}</span> blogs
          </p>
          {Object.values(appliedFilters).some(val => val) && (
            <button
              onClick={handleClear}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Blogs Table */}
        <div className={`rounded-2xl shadow-xl overflow-hidden ${
          themeValue ? 'bg-white' : 'bg-gray-800 '
        }`}>
          {/* Table Header */}
          <div
                className={`hidden md:grid grid-cols-12 gap-4 p-6 border-b ${
                  themeValue
                    ? `border-gray-200 ${light} text-gray-900`
                    : `border-gray-700 ${dark} text-white`
                } font-semibold text-sm`}
              >
              <div className="col-span-1" /> 
              <div className="col-span-5">Blog Post</div>
              <div className="col-span-2">Author</div>
              <div className="col-span-2">Actions</div>
              <div className="col-span-2">Status</div>
            </div>

          {/* Table Body */}
          <AllBlogList 
          filteredBlogs={filteredBlogs}
          themeValue={themeValue}
          light={light}
          dark={dark}
               />
        </div>
   
      </div>
    </div>
  );
}