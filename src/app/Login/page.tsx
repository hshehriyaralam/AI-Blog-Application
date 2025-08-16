"use client"
import Script from "next/script";
import { useDispatch, useSelector } from "react-redux";
import {googleLoginThunk} from "../../Redux/Slices/authSlice"
import type { AppDispatch,RootState } from "../../Redux/store";    
import Image from "next/image";




export default function Login(){
    const dispatch = useDispatch<AppDispatch>();
    const loading = useSelector((state : RootState) => state.auth.loading)
    const user = useSelector((state: RootState) => state.auth.user)
    console.log("user", user)
    const handleGoogleLgin = () => {
        console.log("Continue with google")
        dispatch(googleLoginThunk())
    }
    return(
        <div>
             <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
      />
            <h1>Login</h1>
    <button
    className="p-2 border rounded-xl text-center m-10 cursor-pointer"
    onClick={handleGoogleLgin} disabled={loading} >
      {loading ? "Signing in..." : "Continue with Google"}
    </button>
    <p>Name : {user?.name}</p>
    <p>email : {user?.email}</p>
    <p>role : {user?.role}</p>
    <p>Admin : {user?.isAdmin}</p>
    {/* <Image src={user?.profilePic} width={100} height={100}  alt="user" /> */}
        </div>
    )
}