import Link from 'next/link';
import Image from 'next/image';
import HeroBg from '../../public/Herobg.jpg'
import male_One from '../../public/author-male-one.jpg'
import male_Two from '../../public/author-male-two.jpg'
import male_Three from '../../public/author-male-three.jpg'
import female_One from '../../public/author-female-one.jpg'
import female_Two from '../../public/author-female-two.jpg'
import female_Three from '../../public/author-female-three.jpg'


export default function Hero() {
  const blogs = [
  {
    id: 1,
    title: "Getting Started with Next.js 14",
    summary: "Learn how to build modern web applications with Next.js 14 and React Server Components.",
    author: "Sarah Johnson",
    date: "May 15, 2023",
    tags: ["Next.js", "React", "Web Development"],
    image: "https://tse1.mm.bing.net/th/id/OIP.lXZAzz2UVBpOEqQkN-T3GAHaD4?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 2,
    title: "The Future of AI in Content Creation",
    summary: "Exploring how artificial intelligence is transforming the way we create and consume content online.",
    author: "Michael Chen",
    date: "June 2, 2023",
    tags: ["AI", "Content Creation", "Technology"],
    image: "https://popupdomination.com/blog/wp-content/uploads/2022/03/ca9c325ed9eeda813ceb37d79038e26e.jpg"
  },
  {
    id: 3,
    title: "Responsive Design Best Practices",
    summary: "Essential techniques for creating websites that look great on all devices.",
    author: "Emma Davis",
    date: "June 10, 2023",
    tags: ["CSS", "Web Design", "Responsive"],
    image: "https://tse2.mm.bing.net/th/id/OIP.nFIdXZ-jGXmyDrUfwEFmUAAAAA?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 4,
    title: "Building REST APIs with Node.js",
    summary: "A comprehensive guide to creating robust APIs using Node.js and Express.",
    author: "David Wilson",
    date: "June 18, 2023",
    tags: ["Node.js", "API", "Backend"],
    image: "https://th.bing.com/th/id/OIP.IdSmpUTUoKCgX3BfxLRLhwHaEK?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 5,
    title: "Introduction to Machine Learning",
    summary: "Fundamental concepts you need to know before diving into machine learning.",
    author: "Priya Patel",
    date: "June 25, 2023",
    tags: ["Machine Learning", "Data Science", "AI"],
    image: "https://tse1.mm.bing.net/th/id/OIP.iPFEzWcE0NxB62P7gx8j5AHaEi?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 6,
    title: "CSS Grid vs Flexbox",
    summary: "When to use each layout system for optimal results in your web projects.",
    author: "James Rodriguez",
    date: "July 5, 2023",
    tags: ["CSS", "Frontend", "Web Design"],
    image: "https://tse4.mm.bing.net/th/id/OIP.U_ngD3NReP-r_rzM9ib7lAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 7,
    title: "Mastering TypeScript with Next.js",
    summary: "Dive into TypeScript and leverage its power with Next.js to build robust applications.",
    author: "Linda Martinez",
    date: "July 15, 2023",
    tags: ["TypeScript", "Next.js", "JavaScript"],
    image: "https://wallpaperaccess.com/full/7990074.png"
  },
  {
    id: 8,
    title: "Optimizing Web Performance",
    summary: "Practical tips and techniques to ensure your website loads fast and performs well.",
    author: "Mark Thompson",
    date: "July 22, 2023",
    tags: ["Web Performance", "Optimization", "Best Practices"],
    image: "https://tse3.mm.bing.net/th/id/OIP.hSVCx9oVc4ocRBsuz6Pe0AHaEK?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 9,
    title: "Exploring JAMstack Architecture",
    summary: "A beginner's guide to understanding and building sites with JAMstack architecture.",
    author: "Emily Clark",
    date: "August 1, 2023",
    tags: ["JAMstack", "Static Sites", "Performance"],
    image: "https://tse2.mm.bing.net/th/id/OIP.RegcQnQgJT9n6PvPS179bwHaEK?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 10,
    title: "Serverless Functions: A New Era",
    summary: "How serverless functions are changing the way we build and scale applications.",
    author: "Robert Lee",
    date: "August 7, 2023",
    tags: ["Serverless", "Cloud", "Backend"],
    image: "https://tse4.mm.bing.net/th/id/OIP.6NSpmXQtMluG5R71yEttnwHaEK?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 11,
    title: "Advanced React Patterns",
    summary: "Enhance your React applications with advanced patterns and best practices.",
    author: "Nina Brown",
    date: "August 14, 2023",
    tags: ["React", "Patterns", "Frontend"],
    image: "https://tse1.mm.bing.net/th/id/OIP.GkxEKNEXNF_-JUOlwTkWMQHaEj?w=1920&h=1180&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 12,
    title: "Understanding GraphQL and Its Ecosystem",
    summary: "An in-depth look at GraphQL, why it's gaining popularity, and how to integrate it into your projects.",
    author: "Oliver Smith",
    date: "August 20, 2023",
    tags: ["GraphQL", "API", "Backend"],
    image: "https://content.altexsoft.com/media/2019/03/word-image-10.png.webp"
  },
];


  const popularTags = [
    "Next.js", "React", "AI", "Web Development", "JavaScript", 
    "CSS", "Node.js", "TypeScript", "Frontend", "Backend"
  ];

  const topAuthors = [
    "Sarah Johnson", "Michael Chen", "Emma Davis", 
    "David Wilson", "Priya Patel", "James Rodriguez"
  ];


  const Authors = [
    {
      name : "Sarah Johnson",
      image : female_One
    },
    {
      name : "Michael Chen",
      image : male_One
    },
    {
      name : "Emma Davis",
      image : female_Two
    },
     {
      name : "David Wilson",
      image : male_Two
    },
     {
      name : "Priya Patel",
      image : female_Three
    },
    {
      name : "James Rodriguez",
      image : male_Three
    },
    
  ]

  

  return (
  <div className="min-h-screen bg-gray-50">
  <div className="flex flex-col lg:flex-row gap-y-0 gap-x-4 p-6  justify-center">
    {/* Hero Section with Background Image - 70% Width */}
    <div className="relative w-full lg:w-[74%] h-[600px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover rounded-xl"
          src={HeroBg.src}
          alt="Background"
        />
      </div>

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl mt-24">
          <span className="block">Welcome to</span>
          <span className="block text-blue-400">IntelliBlog</span>
        </h1>
        <p className="mt-4 max-w-lg mx-auto text-xl text-gray-100">
          Your AI-powered platform for creating and discovering amazing content
        </p>
      </div>
    </div>

    {/* Sidebar - 30% Width */}
    <div className="w-full lg:w-[20%] space-y-4">
      {/* Popular Tags */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Top Authors */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Authors</h3>
        <ul className="space-y-3">
          {Authors.map((author, index) => (
            <li key={index} className="flex items-center">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gray-200  flex items-center justify-center text-gray-500">
                <Image src={author.image} alt='Author-pic' className='w-12 h-12 rounded-full object-cover' />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{author.name}</p>
                <p className="text-sm text-gray-500">24 articles</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>

  {/* Main Content */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Latest Articles</h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {blogs.map((blog, index) => {
        const isLargeLeft = index % 6 === 0;
        const isLargeRight = index % 6 === 3;

        let colSpanClass = "md:col-span-1";
        let orderClass = "";

        if (isLargeLeft || isLargeRight) {
          colSpanClass = "md:col-span-2";
          orderClass = isLargeRight ? "md:col-start-2" : "";
        }

        return (
          <Link
            href={`/blog/${blog.id}`}
            key={blog.id}
            className={`
              ${colSpanClass} ${orderClass}
              bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300
              hover:scale-[1.02] cursor-pointer
            `}
          >
            {/* Image */}
            <div className={`${isLargeLeft || isLargeRight ? 'h-64' : 'h-48'} relative`}>
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
                {blog.tags.slice(0, 2).map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white text-blue-800 shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <h2 className={`font-semibold text-gray-800 mb-2 ${isLargeLeft || isLargeRight ? 'text-xl' : 'text-lg'}`}>
                {blog.title}
              </h2>
              <p className={`text-gray-600 mb-3 ${isLargeLeft || isLargeRight ? 'line-clamp-3' : 'line-clamp-2'}`}>
                {blog.summary}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-2">
                    {blog.author.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{blog.author.split(' ')[0]}</span>
                </div>
                <span className="text-xs text-gray-500">{blog.date}</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  </div>
</div>

  );
}