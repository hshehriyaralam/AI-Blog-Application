'use client'
import { useFetchBlogQuery } from "../../Redux/Services/blogApi"; 
import { ContextTheme } from '../../Context/DarkTheme'
import { useContext, useMemo, useState } from 'react';
import BlogCard from "../../components/BlogsComponents/BLogCard";

// Components
import SearchInput from '../../components/BlogsComponents/SearchINput'
import FilterToogle from '../../components/BlogsComponents/FilterToggle'
import AuthorsFilter from '../../components/BlogsComponents/AuthorsFilter'
import DateFilter from "../../components/BlogsComponents/DateFilter";
import Tags from '../../components/BlogsComponents/TagsFilter'
import FilterActions from '../../components/BlogsComponents/FilterActions'

type DraftFilters = {
  authorId: string;
  title: string;
  date: string; 
  tag: string;
};

export default function AllBlogs() {
  const { data, isLoading } = useFetchBlogQuery([]);
  const { themeValue, light, dark, lightText, DarkText } = useContext(ContextTheme);

  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // 1) unique dates for dropdown
  const blogsCreateDates: string[] = useMemo(() => {
    const list = data?.blogs?.map((blog: any) =>
      blog?.createdAt ? new Date(blog.createdAt).toDateString() : ""
    ).filter(Boolean) || [];
    return Array.from(new Set(list));
  }, [data]);

  // 2) draft vs applied filters
  const [draftFilters, setDraftFilters] = useState<DraftFilters>({
    authorId: "",
    title: "",
    date: "",
    tag: ""
  });
  const [appliedFilters, setAppliedFilters] = useState<DraftFilters>(draftFilters);

  const handleApply = () => {
    setAppliedFilters({ ...draftFilters });
  };

  const handleClear = () => {
    const empty: DraftFilters = { authorId: "", title: "", date: "", tag: "" };
    setDraftFilters(empty);
    setAppliedFilters(empty);
    setSearchQuery("");
  };

  // 3) filtering (search + applied filters)
  const filteredBlogs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return (data?.blogs || []).filter((blog: any) => {
      let ok = true;

      // 🔍 search across title/content/author
      if (q) {
        const title = blog?.blogTitle?.toLowerCase() || "";
        const content = blog?.blogContent?.toLowerCase() || "";
        const authorName = blog?.userId?.name?.toLowerCase?.() || "";
        ok = ok && (title.includes(q) || content.includes(q) || authorName.includes(q));
      }

      if (appliedFilters.authorId) {
        const blogAuthorId = typeof blog?.userId === "object"
          ? blog?.userId?.id
          : blog?.userId;

        ok = ok && String(blogAuthorId || "") === String(appliedFilters.authorId);
      }


      // 📅 Date filter
      if (appliedFilters.date) {
        const d = blog?.createdAt ? new Date(blog.createdAt).toDateString() : "";
        ok = ok && d === appliedFilters.date;
      }

      // 🏷️ Tags filter
      if (appliedFilters.tag) {
        const tags: string[] =
          blog?.blogTags?.map((t: string) => t.toLowerCase()) || [];
        ok = ok && tags.includes(appliedFilters.tag.toLowerCase());
      }

      return ok;
    });
  }, [data, searchQuery, appliedFilters]);
  return (
    <div className={`min-h-screen ${themeValue ? `${light}` : `${dark}`} py-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-6xl mx-auto text-center mb-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
            Discover Amazing Content
          </h1>
          <p
            className={`text-lg ${themeValue ? "text-gray-600" : "text-gray-400"} max-w-2xl mx-auto`}
          >
            Explore our collection of insightful articles, tutorials, and stories
            from talented writers around the world.
          </p>
        </div>

        {/* Filters + Search */}
        <div
          className={`mb-4 rounded-xl ${themeValue ? `${light} shadow-md` : `${dark} shadow-xl `} p-6`}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <SearchInput
              themeValue={themeValue}
              light={light}
              dark={dark}
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value)
              }
            />

            <FilterToogle
              onClick={() => setShowFilters(!showFilters)}
              showFilters={showFilters}
            />
          </div>

          {showFilters && (
           <div className="mt-4 pt-4 border-t border-gray-500">
  <div className="flex  flex-wrap gap-6  md:flex-row sm:flex-col">
    <AuthorsFilter
      themeValue={themeValue}
      light={light}
      dark={dark}
      value={draftFilters.authorId}   
      onChange={(val: string) =>
        setDraftFilters((s) => ({ ...s, authorId: val }))
      }
    />
    <DateFilter
      themeValue={themeValue}
      light={light}
      dark={dark}
      BlogsDate={blogsCreateDates}
      value={draftFilters.date}
      onChange={(val: string) =>
        setDraftFilters((s) => ({ ...s, date: val }))
      }
    />
    <Tags
      themeValue={themeValue}
      light={light}
      dark={dark}
      value={draftFilters.tag}
      onChange={(val: string) =>
        setDraftFilters((s) => ({ ...s, tag: val }))
      }
    />
  </div>

  <FilterActions
    themeValue={themeValue}
    light={light}
    dark={dark}
    onApply={handleApply}
    onClear={handleClear}
  />
</div>

          )}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={`h-64 rounded-xl animate-pulse ${
                  themeValue ? "bg-gray-200" : "bg-gray-800"
                }`}
              />
            ))
          ) : filteredBlogs.length === 0 ? (
            <div className={`col-span-3 text-center py-16 opacity-80  `}>
              <p className={`${themeValue ? "text-gray-900" : "text-gray-300"}`} >No matching articles found.</p>
            </div>
          ) : (
            filteredBlogs.map((blog: any, index: number) => {
              const isFeatured = index % 6 === 0;
              return (
                <div
                  key={blog._id}
                  className={`border ${isFeatured ? "lg:col-span-2" : ""} ${
                    themeValue
                      ? `${light}  border-gray-200 `
                      : `${dark} border-gray-700 `
                  } rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer `}
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
            })
          )}
        </div>
      </div>
    </div>
  );
}
