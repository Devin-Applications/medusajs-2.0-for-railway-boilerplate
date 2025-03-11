"use client"

import React from "react"
import dynamic from "next/dynamic"

const Providers = dynamic(() => import("@lib/context/providers"), { 
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen flex-col">
      <div className="relative flex-grow">Loading...</div>
    </div>
  )
})

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>
}
