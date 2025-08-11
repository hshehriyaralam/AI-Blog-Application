import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import User from './Models/user'
import {connectDB} from './dbConnect'


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)


export async function googleLogin(idToken : string){
    await connectDB()

     // 1️⃣ Verify Google ID token
     const ticket = await client.verifyIdToken({
        idToken,
        audience : process.env.GOOGLE_CLIENT_ID
     })

     //payload
     const payload = ticket.getPayload()
     if(!payload || !payload.sub || !payload.email){
        throw new Error("Invalid Google token")
     }

    //  Extract google info from google payload 
    const uid = payload.sub
    const email = payload.email
    const name = payload.name || "Unnamed User" ; 
    const profilePic = payload.picture || null 

    //check if user already exist 
    let user = await User.findOne({uid })

    if(!user){
        user = await User.create({
            uid,
            email,
            name,
            profilePic,
            joiningTime : new Date(),
            lastSeenAt : new Date ()
        })
    }else{
        //update last seen if user exist 
        user.lastSeenAt = new Date()
        await user.save()
    }

    //Generate JWT
    const token = jwt.sign(
        {
            id : user._id ,
            email  : user.email,
            role : user.role
        },
        process.env.JWT_SECRET as string,
        {expiresIn : "7d"}
    )

    return {user, token}
}


