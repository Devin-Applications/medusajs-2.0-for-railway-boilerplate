"use client"

import React from "react"
import { Providers } from "../lib/context/providers"

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <main className="relative">
        {children}
      </main>
    </Providers>
  )
}
