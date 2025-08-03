'use client'
import TopAuthors from '../HomeComponets/Authors';
import HeroTopCard from '../HomeComponets/HeroTopCard';
import Tags from '../HomeComponets/Tags';
import Blogs from './Blogs';
import {ContextTheme} from '../../Context/DarkTheme'
import { useContext } from 'react';


export default function Hero() {
  const {themeValue, light ,dark} = useContext(ContextTheme)
  return (
  <div className={`min-h-screen w-full  pb-5   ${themeValue ? light : dark}`}>
  <div className="flex flex-col lg:flex-row gap-y-4 gap-x-4 p-6  justify-center  ">
   <HeroTopCard />
    <div className="w-full lg:w-[20%] space-y-4">
      <Tags />

      {/* Top Authors */}
      <TopAuthors />
    </div>
  </div>

  {/* Main Content */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  ">
    <h2 className="text-3xl font-bold text-gray-900  mb-4">Latest Articles</h2>
  <Blogs />
  </div>
</div>

  );
}