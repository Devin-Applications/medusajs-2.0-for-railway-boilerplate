"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"

const Footer = dynamic(() => import("@modules/layout/templates/footer"), { ssr: false })
const Nav = dynamic(() => import("@modules/layout/templates/nav"), { ssr: false })

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<div className="h-16 bg-white border-b border-ui-border-base" />}>
        <Nav />
      </Suspense>
      {children}
      <Suspense fallback={<div className="h-[200px] bg-white border-t border-ui-border-base" />}>
        <Footer />
      </Suspense>
    </>
  )
}
