import { Blogs } from "../../lib/Models/Blog";
import { NextResponse } from "next/server";
import { connectDB } from "../../lib/dbConnect";

export async function POST(req: Request){
    try{
        await connectDB()
        const body = await req.json();
        const {
            blogTitle,
            blogContent,
            blogSummary,
            blogTags,
            blogImage,
            userId
        } = body;

        if(!blogTitle || !blogContent || !blogSummary || !blogImage  || !blogTags || !userId  ){
            return NextResponse.json({error : "All fields are required" }, {status : 400})
        }

        const newBlog  = await Blogs.create({
            blogTitle,
            blogContent,
            blogSummary,
            blogTags,
            blogImage,
            userId
        })

        return NextResponse.json({message : "Blog created successfully", blog : newBlog }, {status : 201})
    }catch(error){
       console.error("Error creating blog:", error);
       return NextResponse.json({ error: error || "Internal Server Error" }, { status: 500 });
    }
}