"use client";
import { useGetProfileQuery } from "../../Redux/Services/userApi";
import {liveRefetchOptions} from "../../hooks/rtkOptions";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingPage from '../../components/layout/LoadingPage'


export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useGetProfileQuery(undefined, liveRefetchOptions);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !data?.user) {
      router.push("/");
    }
  }, [data, isLoading, router]);

  if (isLoading) return <LoadingPage />

  return <>{children}</>;
}
