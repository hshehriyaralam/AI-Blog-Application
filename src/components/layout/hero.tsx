'use client'
import TopAuthors from '../HomeComponets/Authors';
import HeroTopCard from '../HomeComponets/HeroTopCard';
import Tags from '../HomeComponets/Tags';
import Blogs from './HomeBlogs';
import {ContextTheme} from '../../Context/DarkTheme'
import { useContext } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';


export default function Hero() {
  
  const {themeValue, light ,dark} = useContext(ContextTheme)
  return (
  <div className={`min-h-screen w-full  pb-5    ${themeValue ? light : dark} `}>
  <div className="flex flex-col lg:flex-row gap-y-4 gap-x-4 p-6  justify-center   ">

   <HeroTopCard />
    <div className="w-full lg:w-[20%] space-y-4">
      <Tags />
      {/* Top Authors */}
      <TopAuthors  navigate={"/Authors"} />
    </div>
  </div>

  {/* Main Content */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  ">
         {/* Header with View All Button */}
      <div className="flex items-center justify-between  mb-2">

            <h2 className={`  sm:text-1xl  lg:text-3xl font-bold  ${themeValue?  'text-gray-900' : 'text-gray-300'} `}>Latest Articles</h2>

        <Link href="/Blogs">
          <Button
            variant="ghost"
            className={`flex items-center gap-2 group  cursor-pointer ${
              themeValue 
                ? 'text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50' 
                : 'text-indigo-400 hover:text-indigo-300 hover:bg-indigo-900/30'
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

  <Blogs />
  </div>
</div>

  );
}