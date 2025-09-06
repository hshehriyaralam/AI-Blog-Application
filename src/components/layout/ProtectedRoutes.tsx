"use client";
import { useGetProfileQuery } from "../../Redux/Services/userApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { googleLoginThunk } from "../../Redux/Slices/authSlice";
import LoadingPage from '../../components/layout/LoadingPage'


export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useGetProfileQuery(undefined, {
        refetchOnMountOrArgChange: true,
        pollingInterval: 10000,
        });
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !data?.user) {
      router.push("/");
    }
  }, [data, isLoading, router]);

  if (isLoading) return <LoadingPage />

  return <>{children}</>;
}
