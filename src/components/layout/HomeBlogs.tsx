'use client'
import { ContextTheme } from '../../Context/DarkTheme'
import { useContext } from 'react';
import { useFetchBlogQuery } from "../../Redux/Services/blogApi"; 
import BlogCard from "../BlogsComponents/BLogCard"
import { Button } from '../ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HomeBlogs() {
  const { data } = useFetchBlogQuery([]);
  const { themeValue, light, dark, lightText, DarkText } = useContext(ContextTheme)
  
  return (
    <div className="flex flex-col gap-8">
 

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data?.slice(0, 9).map((blog: any, index: number) => {
          const isFeatured = index % 6 === 0;
          
          return (
            <div
              key={blog._id}
              className={`
                border
                ${isFeatured ? 'lg:col-span-2' : ''}
                ${themeValue ? `${light} border-gray-200` : `${dark} border-gray-700`} 
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
              />
            </div>    
          );
        })}
      </div>

      {/* Bottom View All Button for Mobile */}
      <div className="lg:hidden flex justify-center mt-4">
        <Link href="/blogs">
          <Button
            className={`flex items-center gap-2 group ${
              themeValue 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                : 'bg-indigo-500 text-white hover:bg-indigo-600'
            }`}
          >
            View All Articles
            <ArrowRight 
              size={16} 
              className="group-hover:translate-x-1 transition-transform" 
            />
          </Button>
        </Link>
      </div>
    </div>
  );
}