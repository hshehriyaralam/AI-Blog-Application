import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'
import { connectDB } from "../../lib/dbConnect";
import User from '../../lib/Models/user'

export async function GET(req:Request){
    try{
        await connectDB()

        // Token ko cookies se read kro 
        const cookieStore = await cookies()
        const token = cookieStore.get("token")?.value;

        if(!token){
            return new Response(JSON.stringify({error : 'Unauthorized'}), {status : 401})
        }

        //verify JWT
        let decode : any;
        try{
            decode = jwt.verify(token, process.env.JWT_SECRET as string)
        }catch(error){
            return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
        }

        // user Fetch from DB
        const user = await User.findById(decode.id).select("-password")
        if(!user) {
             // ✅ Delete cookie if user not found
            (await cookies()).delete("token");
            return new Response(JSON.stringify({error : "User Not Found "}), {status : 404})
        }

        return new Response(JSON.stringify({user}), {status : 200})
    }catch(error : any ){
    console.error("API /user error:", error);
    return new Response(JSON.stringify({ error: error.message || "Server error" }), { status: 500 });
    }
}