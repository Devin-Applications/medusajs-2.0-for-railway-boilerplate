"use client"

import { ReactNode } from "react"
import dynamic from "next/dynamic"

const Nav = dynamic(() => import("@modules/layout/templates/nav"), { ssr: false })
const Footer = dynamic(() => import("@modules/layout/templates/footer"), { ssr: false })

export default function CountryLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1">
        <Nav />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  )
}
