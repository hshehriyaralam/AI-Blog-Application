import Image from "next/image"
import Blog_Banner from '../../../public/Blog_Banner.jpg'
import { Button } from "../ui/button"
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function HeroTopCard(){
    const router = useRouter();
    return(
      <div className="relative w-full lg:w-[74%] h-[500px] md:h-[600px] rounded-xl overflow-hidden  shadow-lg group">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover rounded-xl transform group-hover:scale-105 transition-transform duration-700"
            src={Blog_Banner.src}
            alt="IntelliBlog Background"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center justify-center">
            <div className="bg-indigo-600/20 backdrop-blur-sm p-2 rounded-lg border border-indigo-500/30">
              <span className="text-indigo-300 text-sm font-medium">AI-Powered Blogging</span>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-4">
            <span className="block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Welcome to</span>
            <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mt-2">IntelliBlog</span>
          </h1>
          
          <p className="max-w-lg mx-auto lg:text-lg md:text-sm text-gray-200 mb-8 leading-relaxed">
            Your intelligent platform for creating and discovering amazing AI-powered content
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 ">
            <Link  href={'/Blogs'}>
            <Button className="px-5.5 py-5.5 bg-gradient-to-r from-indigo-600 cursor-pointer to-purple-600 text-[16px] text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-indigo-500/25 transform hover:-translate-y-0.5">
              Start Reading
            </Button>
            </Link>
            <Link  href={'/Create'}>
            <Button className="px-6 py-5 bg-white/10 backdrop-blur-sm cursor-pointer text-white border border-white/20 rounded-lg font-medium hover:bg-white/20 transition-all text-[16px]  ">
              Create Post
            </Button>
            </Link>
          </div>
        </div>

      </div>
    )
}