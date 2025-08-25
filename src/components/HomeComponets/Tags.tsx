'use client'
import {ContextTheme} from '../../Context/DarkTheme'
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useContext } from 'react';
import { useFetchBlogQuery } from '../../Redux/Services/blogApi';



export default   function Tags(){
  const {themeValue, light ,dark ,  lightText, DarkText} = useContext(ContextTheme)
  const {data } = useFetchBlogQuery([])

  const allTags = data?.data.map((blogs: { blogTags: string[] }) => blogs.blogTags).flat() || [];

    return(
        <div className={` p-4 rounded-lg shadow-md   ${themeValue ? light : `border border-gray-500 ${dark}` } }`}>
        <h3 className={`text-lg font-semibold  mb-4  ${themeValue ? lightText : DarkText}`}>Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {allTags.slice(0,6).map((tag: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, index: Key | null | undefined) => (
            <span
              key={index}
              className={`inline-flex items-center px-3 py-1 rounded-full text-[12px] font-medium
               ${themeValue ? 'bg-gray-100 text-gray-800 hover:bg-gray-200' : 'bg-gray-800 text-gray-100 hover:bg-gray-600'}   cursor-pointer`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    )
}