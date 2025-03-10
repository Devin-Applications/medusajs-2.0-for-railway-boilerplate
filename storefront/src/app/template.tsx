"use client"

import React from "react"
import { Providers } from "@lib/context/providers"

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      {children}
    </Providers>
  )
}
