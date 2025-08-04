'use client'
import {ContextTheme} from '../../Context/DarkTheme'
import { blogs } from '../../lib/blog'
import Link from 'next/link';
import { useContext } from 'react';
import Image from 'next/image';



export default function Blogs(){
  const {themeValue, light ,dark, lightText, DarkText} = useContext(ContextTheme)
    return(
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {blogs.slice(0,8).map((blog, index) => {
        const isLargeLeft = index % 6 === 0;
        const isLargeRight = index % 6 === 3;

        let colSpanClass = "md:col-span-1";
        let orderClass = "";

        if (isLargeLeft || isLargeRight) {
          colSpanClass = "md:col-span-2";
          orderClass = isLargeRight ?    "md:col-start-2" : "";
        }

        return (
          <Link
            href={`/blog/${blog.id}`}
            key={blog.id}
            className={`
              ${colSpanClass} ${orderClass}
               ${themeValue ? light : `border border-gray-500 ${dark}` } rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300
              hover:scale-[1.02] cursor-pointer
            `}
          >
            {/* Image */}
            <div className={`${isLargeLeft || isLargeRight ? 'h-64' : 'h-48'} relative`}>
              <img
                src={blog.image}
                alt={blog.title}
                
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
                {blog.tags.slice(0, 2).map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium   shadow-sm   ${themeValue ? `${light}  text-blue-800` : `${dark} text-gray-200` }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <h2 className={`font-semibold  ${themeValue ? lightText : DarkText}  mb-2 ${isLargeLeft || isLargeRight ? 'text-xl' : 'text-lg'}`}>
                {blog.title}
              </h2>
              <p className={`${themeValue ? lightText : 'text-gray-400'} mb-3 ${isLargeLeft || isLargeRight ? 'line-clamp-3' : 'line-clamp-2'}`}>
                {blog.summary}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-2">
                    <Image 
                      placeholder="blur" blurDataURL="/placeholder.png"
                      src={blog.authorPic} alt='Author-pic' className='w-8 h-8 rounded-full object-cover' />
                  </div>
                  <span className={`text-sm font-medium ${themeValue ? lightText : DarkText} `}>{blog.authorName.split(' ')[0]}</span>
                </div>
                <span className={`text-xs ${themeValue ? 'text-gray-600' : 'text-gray-400'}`}>{blog.date}</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
    )
}
