"use client"

import React from "react"
import { Providers } from "./providers"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Providers>
        <main className="relative flex-grow">
          {children}
        </main>
      </Providers>
    </div>
  )
}
