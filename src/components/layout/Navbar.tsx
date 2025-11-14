'use client';
import Link from 'next/link';
import { useContext, useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Moon, Sun, PenSquare, Home, Users, BookOpen, User, Bookmark } from 'lucide-react';
import { ContextTheme } from '../../Context/DarkTheme';
import { useGetProfileQuery } from "../../Redux/Services/userApi";
import { liveRefetchOptions } from "../../hooks/rtkOptions";
import { useDispatch } from "react-redux";
import { googleLoginThunk } from "../../Redux/Slices/authSlice";
import type { AppDispatch } from "../../Redux/store";
import { Button } from '../ui/button';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { themeValue, changeTheme, light, dark } = useContext(ContextTheme);
  const { data } = useGetProfileQuery(undefined, liveRefetchOptions);

  const router = useRouter();
  const pathname = usePathname();

  const isAuthenticated = !!data?.user;

  /** 🔹 Outside Click Close — Mobile Menu */
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (menuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);


  /** 🔹 Navigation Logic */
  const handleNavigate = async (link: string) => {
    if (isAuthenticated) {
      setMenuOpen(false);
      router.push(link);
      return;
    }
    handleAuthAndNavigate(link);
  };

  const handleAuthAndNavigate = async (link: string) => {
    if (isAuthenticating) return;
    setIsAuthenticating(true);

    try {
      await dispatch(googleLoginThunk()).unwrap();
      setMenuOpen(false);
      router.push(link);
    } catch (error) {
      console.error("Google login failed:", error);
    } finally {
      setIsAuthenticating(false);
    }
  };

  /** 🔹 Close menu on route change */
  useEffect(() => {
    setMenuOpen(false);
  }, [router]);


  /** 🔹 Navbar Links */
  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/Create", label: "Create Blog", icon: PenSquare },
    { href: "/Blogs", label: "Blogs", icon: BookOpen },
    { href: "/Authors", label: "Authors", icon: Users },
    { href: "/Collection", label: "Collection", icon: Bookmark },
  ];

  const activeClasses = themeValue
    ? "bg-indigo-50 text-indigo-700"
    : "bg-indigo-900/30 text-indigo-300";


  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur-md py-0.5 bg-opacity-90 ${
        themeValue
          ? `${light} border-b border-gray-200 shadow-sm`
          : `${dark} border-b border-gray-800 shadow-lg`
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-3 px-6">

        {/* ================= LOGO ================= */}
        <Link
          href="/"
          className="text-2xl font-bold flex items-center gap-1 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent cursor-pointer"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className={`p-1.5 rounded-lg ${themeValue ? 'bg-indigo-100' : 'bg-indigo-900/30'}`}
          >
            <BookOpen size={18} className="text-indigo-600" />
          </div>
          Intelli<span className="text-indigo-500">Blog</span>
        </Link>

        {/* =============== DESKTOP MENU =============== */}
        <div className="hidden lg:flex items-center gap-2">
          <nav>
            <ul
              className={`flex space-x-3 font-medium items-center ${
                themeValue ? 'text-gray-700' : 'text-gray-200'
              }`}
            >
              {navLinks.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <button
                    onClick={() => handleNavigate(href)}
                    disabled={isAuthenticating}
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-all cursor-pointer disabled:opacity-50 ${
                      pathname === href
                        ? activeClasses
                        : 'hover:bg-indigo-50 hover:text-indigo-700 '
                    }`}
                  >
                    <Icon size={16} />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4 pl-4 border-l border-gray-200 ml-4">
            <button
              onClick={() => handleNavigate('/Profile')}
              disabled={isAuthenticating}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer disabled:opacity-50 ${
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
              className={`p-2.5 rounded-full transition-all duration-500 cursor-pointer ${
                themeValue
                  ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                  : 'bg-indigo-900/30 text-indigo-300 hover:bg-indigo-900/50'
              }`}
            >
              {themeValue ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>
        </div>

        {/* =============== MOBILE MENU BUTTON =============== */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={changeTheme}
            className={`p-2 rounded-full transition-all cursor-pointer ${
              themeValue
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-indigo-900/30 text-indigo-300'
            }`}
          >
            {themeValue ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`p-2 rounded-lg transition-all cursor-pointer ${
              themeValue
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-indigo-900/30 text-indigo-300'
            }`}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* =============== MOBILE DROPDOWN =============== */}
      <div
        ref={mobileMenuRef}
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-900 ease-in-out ${
          menuOpen ? 'max-height-96 opacity-100' : 'max-h-0 opacity-0'
        } ${themeValue ? `${light}` : `${dark} text-gray-200`}`}
      >
        <div className="px-6 py-2 space-y-3">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <button
              key={href}
              onClick={() => handleNavigate(href)}
              disabled={isAuthenticating}
              className={`flex items-center gap-2 px-2 py-1 rounded-lg font-medium w-full text-left transition-all cursor-pointer disabled:opacity-50 ${
                pathname === href
                  ? 'bg-indigo-200 text-gray-900'
                  : 'hover:bg-indigo-200 hover:text-gray-900'
              }`}
            >
              <Icon size={16} />
              <h2 className="text-[16px] font-semibold">{label}</h2>
            </button>
          ))}

          <div className="pt-3 border-t border-gray-200 mt-3">
            <Button
              onClick={() => handleNavigate('/Profile')}
              disabled={isAuthenticating}
              className={`flex items-center gap-2 px-2 py-1 rounded-lg w-full transition-all cursor-pointer disabled:opacity-50 ${
                themeValue
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600'
              }`}
            >
              <User size={16} />
              <h2 className="text-[16px] font-semibold">Profile</h2>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
