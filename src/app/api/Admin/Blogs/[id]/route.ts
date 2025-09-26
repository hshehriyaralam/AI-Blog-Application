import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/dbConnect"
import { Blogs } from "../../../../lib/Models/Blog";



export async function DELETE(req: Request, context: { params: { id: string } }){
    try{
        await connectDB();
        const { id } = await context.params;

        const blog = await Blogs.findById(id);
        if(!blog){
        return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      )};

      await Blogs.findByIdAndDelete(id)

      return NextResponse.json(
      { success: true, message: "Blog deleted successfully" },
      { status: 200 }
    )
    }catch(error){
        return NextResponse.json(
      { success: false, message: "Error deleting blog", error: error },
      { status: 500 }
    );
    }
}