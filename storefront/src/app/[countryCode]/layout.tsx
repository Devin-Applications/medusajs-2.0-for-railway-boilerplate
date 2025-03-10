"use client"

import { ReactNode } from "react"

export default function CountryLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      {children}
    </div>
  )
}
