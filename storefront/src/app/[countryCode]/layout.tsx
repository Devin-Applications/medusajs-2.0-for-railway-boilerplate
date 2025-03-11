"use client"

import { ReactNode } from "react"
import dynamic from "next/dynamic"

const CountryClientLayout = dynamic(() => import("./client-layout"), { ssr: false })

export default function CountryLayout({ children }: { children: ReactNode }) {
  return <CountryClientLayout>{children}</CountryClientLayout>
}
