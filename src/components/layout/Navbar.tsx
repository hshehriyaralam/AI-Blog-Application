'use client';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import {ContextTheme} from '../../Context/DarkTheme'




export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const {themeValue,changeTheme, light ,dark} = useContext(ContextTheme)

  return (
    <header className={`${themeValue ? light : dark} shadow-md sticky top-0 z-50 fixed w-full`}>
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link href="/" className="text-2xl font-extrabold text-blue-600 tracking-tight">
          Intelli<span className={`${themeValue ? 'text-gray-800' : 'text-gray-200'}`}>Blog</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6">
          <nav>
            <ul className={`flex space-x-6 font-medium ${themeValue ? 'text-gray-700' : 'text-gray-200'}`}>
              <li><Link href="/" className="hover:text-blue-500 transition">Home</Link></li>
              <li><Link href="/Write" className="hover:text-blue-500 transition">Create Blog</Link></li>
              <li><Link href="/Blogs" className="hover:text-blue-500 transition">Blogs</Link></li>
              <li>
                <Link href="/Login" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-md transition">
                  Login
                </Link>
              </li>
            </ul>
          </nav>
          <button
            onClick={changeTheme}
            className={` ${themeValue ? 'text-blue-600' : 'text-yellow-400' }   transition  duration-500 cursor-pointer `}
          >
            {themeValue ? <Moon size={24} /> : <Sun size={24} />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-4">
          <button onClick={changeTheme}  className={` ${themeValue ? 'text-blue-600' : 'text-yellow-400' }   transition  duration-500 cursor-pointer `}>
            {themeValue ? <Moon size={22} /> : <Sun size={22} />}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-blue-600">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`lg:hidden overflow-hidden transition-all duration-500 ${menuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
        <ul className={`flex flex-col space-y-4 font-medium px-6 pb-4 pt-2 ${themeValue ? 'text-gray-700' : 'text-gray-200'}`}>
          <li><Link href="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link href="/Write" onClick={() => setMenuOpen(false)}>Write Blog</Link></li>
          <li><Link href="/Blogs" onClick={() => setMenuOpen(false)}>Blogs</Link></li>
          <li>
            <Link href="/Login" onClick={() => setMenuOpen(false)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-md transition">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
