'use client'
import {ContextTheme} from '../../Context/DarkTheme'
import { useContext } from 'react';




export default   function Tags(){
  const {themeValue, light ,dark ,  lightText, DarkText} = useContext(ContextTheme)
      const popularTags = [
    "Next.js", "React", "AI", "Web Development", "JavaScript", 
    "CSS", "Node.js", "TypeScript", "Frontend", "Backend"
  ];
    return(
        <div className={` p-4 rounded-lg shadow-md   ${themeValue ? light : `border border-gray-500 ${dark}` } }`}>
        <h3 className={`text-lg font-semibold  mb-4  ${themeValue ? lightText : DarkText}`}>Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag, index) => (
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