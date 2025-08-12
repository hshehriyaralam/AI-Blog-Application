"use client"
import Script from "next/script";
import { useDispatch, useSelector } from "react-redux";
import {googleLoginThunk} from "../../Redux/Slices/authSlice"
import type { AppDispatch,RootState } from "../../Redux/store";    



export default function Login(){
    const dispatch = useDispatch<AppDispatch>();
    const loading = useSelector((state : RootState) => state.auth.loading)

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
    onClick={handleGoogleLgin} disabled={loading}>
      {loading ? "Signing in..." : "Continue with Google"}
    </button>
        </div>
    )
}