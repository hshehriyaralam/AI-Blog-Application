"use client";
import { useGetUserQuery } from "../../Redux/Services/userApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "../Common/Loader";

export default function AdminProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useGetUserQuery(undefined, {
        refetchOnMountOrArgChange: true,
        pollingInterval: 10000,
        });
  const router = useRouter();

  useEffect(() => {
    if (!isLoading  && data?.user.role === "author") {
      router.push("/");
    }
  }, [data, isLoading, router]);

  if (isLoading) return <div className="w-full h-screen flex justify-center items-center"  > <Loader /> </div>;

  return <>{children}</>;
}
