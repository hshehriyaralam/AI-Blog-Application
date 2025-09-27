'use client'
import { ContextTheme } from "../../Context/DarkTheme"
import { FileText, Plus } from "lucide-react";
//Components
import SearchInput from "../BlogsComponents/SearchINput"
import FilterToogle from "..//BlogsComponents/FilterToggle";
import AuthorsFilter from "../BlogsComponents/AuthorsFilter";
import DateFilter from "..//BlogsComponents/DateFilter";
import Tags from "../BlogsComponents/TagsFilter";
import FilterActions from "../BlogsComponents/FilterActions";
import { useContext, useMemo,  } from "react";

type DraftFilters = {
  authorId: string;
  title: string;
  date: string;
  tag: string;
};


export default function AllFiltersBlogs({
    data,
    setDraftFilters,
    setAppliedFilters,
    setSearchQuery,
    draftFilters,
    searchQuery,
    setShowFilters,
    showFilters,


}:any){
      const { themeValue, light, dark } = useContext(ContextTheme);


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

    return(
        <div className={`mb-6 rounded-2xl shadow-lg border ${
                  themeValue ? `${light} border-gray-200` : `${dark} border-gray-700`
                } p-4`}>
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
                    <div className={`mt-6 pt-6 border-t ${
                      themeValue ? 'border-gray-200' : 'border-gray-700'
                    }`}>
                      <div className="flex flex-wrap gap-6">
                        <AuthorsFilter
                          themeValue={themeValue}
                          light={light}
                          dark={dark}
                          value={draftFilters.authorId}
                          onChange={(val: string) =>
                            setDraftFilters((s:any) => ({ ...s, authorId: val }))
                          }
                        />
                        <DateFilter
                          themeValue={themeValue}
                          light={light}
                          dark={dark}
                          BlogsDate={blogsCreateDates}
                          value={draftFilters.date}
                          onChange={(val: string) =>
                            setDraftFilters((s:any) => ({ ...s, date: val }))
                          }
                        />
                        <Tags
                          themeValue={themeValue}
                          light={light}
                          dark={dark}
                          value={draftFilters.tag}
                          onChange={(val: string) =>
                            setDraftFilters((s:any) => ({ ...s, tag: val }))
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
    )
}