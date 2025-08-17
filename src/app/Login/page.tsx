"use client"
import Script from "next/script";
import { useDispatch, useSelector } from "react-redux";
import {googleLoginThunk} from "../../Redux/Slices/authSlice"
import type { AppDispatch,RootState } from "../../Redux/store";    
import   {useGetUserQuery}  from '../../Redux/Services/userApi'




export default function Login(){
    const dispatch = useDispatch<AppDispatch>();
    const loading = useSelector((state : RootState) => state.auth.loading)
    const { data} = useGetUserQuery(undefined, {
        refetchOnMountOrArgChange: true,
        pollingInterval: 10000,
        })



    const handleGoogleLgin = () => {
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
    <p>Name : {data?.user?.name}</p>
    <p>Email : {data?.user?.email}</p>
    <p>ROle : {data?.user?.role}</p>
    <p>BlogCount : {data?.user.blogCount}</p>
    <img src={data?.user?.profilePic} width={100} height={100}  alt="user" />
        </div>
    )
}