import { connectDB } from "../../lib/dbConnect"
import {User} from "../../lib/Models/user"
import { NextResponse } from "next/server"


export  async function GET(){
    try{
        await connectDB()
        const allUsers = await User.find()
        return NextResponse.json({data : allUsers}, {status : 200})
    }catch(error){
        return NextResponse.json({error:error}, {status:500})
    }
}

