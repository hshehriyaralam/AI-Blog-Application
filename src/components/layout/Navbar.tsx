'use client';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { Menu, X, Moon, Sun, PenSquare, Home, Users, BookOpen, User,Bookmark, } from 'lucide-react';
import { ContextTheme } from '../../Context/DarkTheme';
import { useGetProfileQuery } from "../../Redux/Services/userApi";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { googleLoginThunk } from "../../Redux/Slices/authSlice";
import type { AppDispatch } from "../../Redux/store";    
import { Button } from '../ui/button';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { themeValue, changeTheme, light, dark } = useContext(ContextTheme);
  const { data, isLoading, refetch } =  useGetProfileQuery(undefined, {
  refetchOnMountOrArgChange: false,
  refetchOnReconnect: false,
  refetchOnFocus: false,
});;
  const router = useRouter();
  
  const handleNavigate = async (link: string) => {

    // setMenuOpen(false);
    //   router.push(link);

    if (!data?.user) {
      try {
        const res = await dispatch(googleLoginThunk()).unwrap();
        await refetch();
        setMenuOpen(false);
        router.push(link);
      } catch (error) {
        console.error("Google login failed:", error);
      }
    } else {
      setMenuOpen(false);
      router.push(link);
    }
  };

  return (
    <header className={`sticky top-0 z-50 w-full backdrop-blur-md py-0.5 bg-opacity-90 ${
      themeValue 
        ? `${light} border-b border-gray-200 shadow-sm`
        : `${dark}  border-b border-gray-800 shadow-lg`
    }`}>
      <div className="container mx-auto flex justify-between items-center py-3 px-6">
        {/* Logo */}
        <Link 
          href="/" 
          className="text-2xl font-bold flex items-center gap-1 cursor-pointer  bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
        >
          <div className={`p-1.5 rounded-lg ${themeValue ? 'bg-indigo-100' : 'bg-indigo-900/30'}`}>
            <BookOpen size={18} className="text-indigo-600" />
          </div>
          Intelli<span className="text-indigo-500">Blog</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-2">
          <nav>
            <ul className={`flex space-x-3 font-medium items-center ${themeValue ? 'text-gray-700' : 'text-gray-200'}`}>
              <li>
                <Link 
                  href="/" 
                  className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 transition-all cursor-pointer"
                >
                  <Home size={16} />
                  Home
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigate('/Create')} 
                  className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 transition-all cursor-pointer "
                >
                  <PenSquare size={16} />
                  Create Blog
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigate('/Blogs')} 
                  className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 transition-all cursor-pointer"
                >
                  <BookOpen size={16} />
                  Blogs
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigate('/Authors')} 
                  className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 transition-all cursor-pointer"
                >
                  <Users size={16} />
                  Authors
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigate('/Authors')} 
                  className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 transition-all cursor-pointer"
                >
                  <Bookmark size={16} />
                  Collection
                </button>
              </li>
            </ul>
          </nav>
          
          <div className="flex items-center gap-4 pl-4 border-l border-gray-200 dark:border-gray-700 ml-4">
            <button
              onClick={() => handleNavigate('/Profile')}
              className={`flex items-center gap-2 px-3 py-1.5 cursor-pointer  rounded-lg font-medium transition-all ${
                themeValue 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md' 
                  : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 shadow-md'
              }`}
            >
              <User size={16} />
              Profile
            </button>
            
            <button
              onClick={changeTheme}
              className={`p-2.5 rounded-full cursor-pointer  transition-all duration-300 ${
                themeValue 
                  ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200' 
                  : 'bg-indigo-900/30 text-indigo-300 hover:bg-indigo-900/50'
              }`}
            >
              {themeValue ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-3">
          <button 
            onClick={changeTheme}
            className={`p-2 rounded-full transition-all ${
              themeValue 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'bg-indigo-900/30 text-indigo-300'
            }`}
          >
            {themeValue ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className={`p-2 rounded-lg transition-all ${
              themeValue 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'bg-indigo-900/30 text-indigo-300'
            }`}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`lg:hidden overflow-hidden  ${
        menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      } ${themeValue ? `${light}` : `${dark} text-gray-200`}`}>
        <div className="px-6 py-2 space-y-3">
          <Link 
            href="/" 
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 px-2 py-0.5 cursor-pointer rounded-lg text-lg font-medium  hover:bg-indigo-200 hover:text-gray-900"
          >
            <Home size={16} />
            <h2 className='text-[16px] font-semibold' >
            Home
            </h2>
          </Link>
          
          <button 
            onClick={() => handleNavigate('/Create')}
            className="flex items-center gap-2 px-2 py-0.5 cursor-pointer  rounded-lg text-lg font-medium  hover:bg-indigo-200 hover:text-gray-900  w-full text-left"
          >
            <PenSquare size={16} />
            <h2 className='text-[16px] font-semibold' >
            Create Blog
            </h2>
            
          </button>
          
          <button 
            onClick={() => handleNavigate('/Blogs')}
            className="flex items-center gap-2 px-2 py-0.5 cursor-pointer  rounded-lg text-lg font-medium  hover:bg-indigo-200 hover:text-gray-900 w-full text-left"
          >
            <BookOpen size={16} />
             <h2 className='text-[16px] font-semibold' >
            Blogs
            </h2>
            
          </button>
          
          <button 
            onClick={() => handleNavigate('/Authors')}
            className="flex items-center gap-2 px-2 py-0.5 cursor-pointer  rounded-lg text-lg font-medium  hover:bg-indigo-200 hover:text-gray-900 w-full text-left"
          >
            <Users size={16} />
            <h2 className='text-[16px] font-semibold' >
            Authors
            </h2>
            
          </button>

           <button 
            onClick={() => handleNavigate('/Authors')}
            className="flex items-center gap-2 px-2 py-0.5 cursor-pointer  rounded-lg text-lg font-medium  hover:bg-indigo-200 hover:text-gray-900 w-full text-left"
          >
             <Bookmark size={16} />
            <h2 className='text-[16px] font-semibold' >
            Collection
            </h2>
            
          </button>
          
          <div className="pt-3 border-t border-gray-200 dark:border-gray-700 mt-3">
            <Button 
              onClick={() => handleNavigate('/Profile')}
              className={`flex items-center gap-2 px-2 py-0.5 cursor-pointer  rounded-lg text-lg font-medium  w-full ${
                themeValue 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700' 
                  : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600'
              }`}
            >
              <User size={16} />
               <h2 className='text-[16px] font-semibold' >
              Profile
              </h2>
              
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}