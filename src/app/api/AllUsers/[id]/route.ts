import { NextResponse } from "next/server";
import { User } from "../../../lib/Models/user";
import { connectDB } from '../../../lib/dbConnect'

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }   
) {
  try {
    await connectDB();

    const {id} = await  context.params; 
    const singleAuthor = await User.findById(id);

    if (!singleAuthor) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 });
    }

    return NextResponse.json({ data: singleAuthor }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error || "Internal Error In Single Author" }, { status: 500 });
  }
}
