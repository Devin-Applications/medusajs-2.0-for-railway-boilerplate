"use client"

import { ReactNode } from "react"
import dynamic from "next/dynamic"

const Nav = dynamic(() => import("@modules/layout/templates/nav"), { ssr: false })
const Footer = dynamic(() => import("@modules/layout/templates/footer"), { ssr: false })

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  )
}
