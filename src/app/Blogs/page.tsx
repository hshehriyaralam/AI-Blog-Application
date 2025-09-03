'use client'
import { useFetchBlogQuery } from "../../Redux/Services/blogApi"; 
import { ContextTheme } from '../../Context/DarkTheme'
import { useContext } from 'react';
import BlogsList from "../../components/BlogsComponents/BLogCard.tsx";


export default function AllBlogs() {
    const { data} = useFetchBlogQuery([]);
  const { themeValue, light, dark,} = useContext(ContextTheme);
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 p-4 ${themeValue ? light : dark}`} >
      {data?.data?.map((blog: any, index: number) => {
        const isLargeLeft = index % 6 === 0;
        const isLargeRight = index % 6 === 3;

        let colSpanClass = "md:col-span-1";
        let orderClass = "";

        if (isLargeLeft || isLargeRight) {
          colSpanClass = "md:col-span-2";
          orderClass = isLargeRight ? "md:col-start-2" : "";
        }

        return (
           <div
        key={blog._id}
        className={`
        ${colSpanClass} ${orderClass}
        ${themeValue ? light : `border border-gray-500 ${dark}`} 
        rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300
        hover:scale-[1.02] cursor-pointer
    `}>
      <BlogsList 
      blog={blog}
      isLargeLeft={isLargeLeft}
      isLargeRight={isLargeRight}
      />
      </div>        
       );
      })}
    </div>
  );
}
