"use client";
import { useParams } from "next/navigation";
import { useSingleBlogQuery } from "../../../Redux/Services/blogApi"; 
import { ContextTheme } from "../../../Context/DarkTheme";
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useContext } from "react";
import Image from "next/image";


export default function BlogDetail() {
  const params = useParams();
  const id = params?.id as string
  
  console.log("URL se mila ID:", id);
  const { data, isLoading, error } = useSingleBlogQuery(id)
  const { themeValue, light, dark, lightText, DarkText } =useContext(ContextTheme);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching blog details.</p>;

  const blog = data?.data;
  console.log("blog",blog)

  if (!blog) return <p>Blog not found!</p>;

  return (
    <div className="w-full h-screen p-3 ">
      <h1 className="text-4xl my-2 text-center font-bold" >{blog.blogTitle}</h1>
      <div className="w-full  p-10 "  >
      <img 
        src={blog.blogImage} alt={"blogImage"} 
        className="h-96 mx-auto"
        />
        </div>
        <div className="my-4">
          <h3 className="text-4xl mx-10 font-bold"  >Blog Content</h3>
          <p  className="my-1 text-justify">
            {blog.blogContent}
          </p>
        </div>
           <div className="my-4">
          <h3 className="text-2xl mx-10 font-bold"  >Blog Tags </h3>
            {blog.blogTags.map((tags: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined,index: Key | null | undefined) => (
          <p 
          key={index}
          className="mx-10 flex">
            {tags}
          </p>
            ))}
        </div>
        <div className="my-4">
          <h3 className="text-4xl mx-10 font-bold"  >Blog Summary</h3>
          <p  className="my-1 text-justify">
            {blog.blogSummary}
          </p>
        </div>
    </div>
  );
}
