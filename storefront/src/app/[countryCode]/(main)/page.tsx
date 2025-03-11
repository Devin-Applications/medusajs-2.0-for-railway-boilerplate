"use client"

import dynamic from "next/dynamic"

const ClientHome = dynamic(() => import("./client-page"), { 
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen flex-col">
      <div className="relative flex-grow">Loading...</div>
    </div>
  )
})

export default function Home() {
  return <ClientHome />
}
