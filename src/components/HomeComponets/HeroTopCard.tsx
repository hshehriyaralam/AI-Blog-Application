import Image from "next/image"
import Blog_Banner from '../../../public/Blog_Banner.jpg'


export default function HeroTopCard(){
    return(
    <div className="relative w-full lg:w-[74%] h-[600px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          className="w-full h-full object-cover rounded-xl"
          placeholder="blur" blurDataURL="/placeholder.png"
          src={Blog_Banner}
          alt="Background"
        />
      </div>

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl mt-24">
          <span className="block">Welcome to</span>
          <span className="block text-blue-400 ">IntelliBlog</span>
        </h1>
        <p className="mt-4 max-w-lg mx-auto text-xl text-gray-100">
          Your AI-powered platform for creating and discovering amazing content
        </p>
      </div>
    </div>
    )
}