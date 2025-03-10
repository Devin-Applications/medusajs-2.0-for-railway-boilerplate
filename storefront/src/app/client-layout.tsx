"use client"

import React from "react"
import Providers from "../lib/context/providers"
import { Suspense } from "react"
import dynamic from "next/dynamic"

const Footer = dynamic(() => import("@modules/layout/templates/footer"), { ssr: false })
const Nav = dynamic(() => import("@modules/layout/templates/nav"), { ssr: false })

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Providers>
        <Suspense fallback={<div className="h-16 bg-white border-b border-ui-border-base" />}>
          <Nav />
        </Suspense>
        <main className="relative flex-grow">
          {children}
        </main>
        <Suspense fallback={<div className="h-[200px] bg-white border-t border-ui-border-base" />}>
          <Footer />
        </Suspense>
      </Providers>
    </div>
  )
}
