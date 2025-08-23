"use client"
import Script from "next/script";
import { useDispatch, useSelector } from "react-redux";
import {googleLoginThunk} from "../../Redux/Slices/authSlice"
import type { AppDispatch } from "../../Redux/store";    
import   {useGetUserQuery,}  from '../../Redux/Services/userApi'




export default function Profile(){
    const dispatch = useDispatch<AppDispatch>();
    const { data, isLoading} = useGetUserQuery(undefined, {
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
            <h1>Profile</h1>
    <button
    className="p-2 border rounded-xl text-center m-10 cursor-pointer"
    onClick={handleGoogleLgin} disabled={isLoading} >
      {isLoading ? "Signing in..." : "Continue with Google"}
    </button>
    <p>Name : {data?.user?.name}</p>
    <p>Email : {data?.user?.email}</p>
    <p>ROle : {data?.user?.role}</p>
    <p>BlogCount : {data?.user.blogCount}</p>
    <p>Id : {data?.user.id}</p>
    <img src={data?.user?.profilePic} width={100} height={100}  alt="user" />
        </div>
    )
}