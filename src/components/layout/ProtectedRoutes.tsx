"use client";
import { useGetUserQuery } from "../../Redux/Services/userApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useGetUserQuery(undefined, {
        refetchOnMountOrArgChange: true,
        pollingInterval: 10000,
        });
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !data?.user) {
      router.push("/");
    }
  }, [data, isLoading, router]);

  if (isLoading) return <p>Loading...</p>;

  return <>{children}</>;
}
