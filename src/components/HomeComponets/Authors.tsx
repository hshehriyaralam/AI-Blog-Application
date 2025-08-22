'use client'
import Image from 'next/image'
import {ContextTheme} from '../../Context/DarkTheme'
import { useContext } from 'react';
import { blogs } from '../../lib/blog'
import   {useGetUserQuery}  from '../../Redux/Services/userApi'
 



export default function TopAuthors(){
        const { data} = useGetUserQuery(undefined)
  const {themeValue, light ,dark , lightText, DarkText} = useContext(ContextTheme)
    return(
    <div className={`p-6 rounded-lg shadow-md ${themeValue ? light : `border border-gray-500 ${dark}` } `}>
    <h3 className={`text-lg font-semibold  mb-4 ${themeValue ? lightText :DarkText } `}>Top Authors</h3>
    <ul className="space-y-3">
        {data?.map((blog: any, index: number) => (
        <li key={index} className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gray-200  flex items-center justify-center text-gray-500">
            <img 
            src={data?.user?.profilePic || "/placeholder.png"}
             alt='Author-pic' className='w-12 h-12 rounded-full object-cover' />
            </div>
            <div className="ml-3">
            <p className={`text-sm font-medium ${themeValue ? lightText : DarkText}`}>{blog.authorName}</p>
            <p className={`text-sm  text-gray-500   `}>24 articles</p>
            </div>
        </li>
        ))}
    </ul>
    </div>
    )
}
