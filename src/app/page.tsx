'use client'
import Hero from '../components/layout/hero'
import   {useAllUserQuery}  from "../Redux/Services/userApi"

export default function Home() {

  const {data} = useAllUserQuery(undefined)
  console.log("all Users", data?.data)
  console.log("Users Name", data?.data?.[0]?.name)

  return (
    <div className={`w-full h-screen bg-gray-100`}>
      <Hero />
    </div>
  );
}
