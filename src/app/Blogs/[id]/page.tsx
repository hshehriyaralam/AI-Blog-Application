"use client";
import { useParams } from "next/navigation";
import { useSingleBlogQuery } from "../../../Redux/Services/blogApi"; 
import { ContextTheme } from "../../../Context/DarkTheme";
import { useContext, useState, useEffect } from "react";
import BlogTags from "../../../components/BlogDetails/blogTags";
import ActionRow from "../../../components/BlogDetails/ActionRow";
import AuthorInfo from "../../../components/BlogDetails/AuthorInfo";
import LoadingPage from  '../../../components/layout/LoadingPage';

export default function BlogDetail() {
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading, error } = useSingleBlogQuery(id);
  const { themeValue, light, dark, lightText, DarkText } = useContext(ContextTheme);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<{ section: string; index: number | null }>({
    section: "",
    index: null,
  });

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel(); 
    };
  }, []);

  
  if (isLoading) {
    return <LoadingPage />;
  }


  if (error) {
    return (
      <div className={`w-full h-screen flex justify-center
        text-red-500 font-bold text-2xl items-center 
        ${themeValue ? light : dark}`}>
        Error fetching blog details.
      </div>
    );
  }

  const blog = data?.data;
  if (!blog) {
    return (
      <div className={`w-full h-screen flex justify-center items-center text-2xl font-bold ${themeValue ? light : `text-gray-300 ${dark}`}`}>
        Blog not found!
      </div>
    );
  }

  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const shortId = blog.userId?._id ? blog.userId._id.slice(-4) : null;
  const words = blog.blogTitle?.split(" ") || [];
  const shortTitle = words.slice(0, 4).join(" ");

  const contentWords = blog.blogContent?.split(" ") || [];
  const summaryWords = blog.blogSummary?.split(" ") || [];

  return (
    <div className={`w-full min-h-screen px-4 sm:px-6 py-10 ${themeValue ? light : dark}`}>
      <div className="max-w-full sm:max-w-4xl md:max-w-5xl mx-auto">

        {/* Blog Image */}
        <div className="w-full flex justify-center mb-6">
          <img
            src={blog.blogImage}
            alt={blog.blogTitle}
            className="w-[85%] sm:w-[80%] md:w-[95%] h-[280px] sm:h-[320px] md:h-[380px] rounded-lg shadow-lg object-cover hover:scale-[1.01] transition-transform duration-300"
          />
        </div>

        {/* Blog Title */}
        <h2 className={`text-3xl sm:text-4xl md:text-4xl font-bold mb-4 text-center tracking-wide ${themeValue ? lightText : DarkText}`}>
          {blog.blogTitle}
        </h2>

        {/* Author Line */}
        <p className={`text-center mb-10 italic font-medium ${themeValue ?"text-indigo-600":"text-indigo-400"}`}>
          By <span className="font-semibold">{blog.userId?.name || "Unknown Author"}</span> 
          {" "} · {formattedDate} · <span className="font-semibold">{shortTitle}{shortId}</span>
        </p>

        {/* Blog Content */}
        <div className="mb-12 px-2 sm:px-6">
          <h3 className={`text-2xl font-semibold mb-4 ${themeValue ? lightText : DarkText} ${currentIndex.section === "content-heading" ? "bg-yellow-300 px-2 rounded text-gray-700" : ""}`}>
            Content
          </h3>
          <p className={`leading-8 text-justify text-lg flex flex-wrap gap-1 ${ themeValue ? lightText : "text-gray-300"}`}>
            {contentWords.map((word:string, i:number) => (
              <span
                key={i}
                className={
                  currentIndex.section === "content" && i === currentIndex.index
                    ? "bg-yellow-300 px-1 rounded text-gray-700"
                    : ""
                }
              >
                {word}
              </span>
            ))}
          </p>
        </div>

        {/* Blog Summary */}
        {blog.blogSummary && (
          <div className="mb-12 px-2 sm:px-6">
            <h3 className={`text-2xl font-semibold mb-4 ${themeValue ? lightText : DarkText} ${currentIndex.section === "summary-heading" ? "bg-yellow-300 px-2 rounded text-gray-700" : ""}`}>
              AI Summary
            </h3>
            <p className={`leading-8 text-justify text-lg flex flex-wrap gap-1 ${ themeValue ? lightText : "text-gray-300"}`}>
              {summaryWords.map((word:string, i:number) => (
                <span
                  key={i}
                  className={
                    currentIndex.section === "summary" && i === currentIndex.index
                      ? "bg-yellow-300 px-1 rounded text-gray-700"
                      : ""}>
                  {word}
                </span>
              ))}
            </p>
          </div>
        )}

        {/* Tags */}
        <BlogTags blog={blog} />

        {/* Actions Row */}
        <ActionRow 
          blogContent={blog.blogContent} 
          blogSummary={blog.blogSummary}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setCurrentIndex={setCurrentIndex}
        />

        {/* Author Info Bottom */}
        <AuthorInfo 
          blog={blog}
          themeValue={themeValue}
          lightText={lightText}
          DarkText={DarkText}
        />
      </div>
    </div>
  );
}
