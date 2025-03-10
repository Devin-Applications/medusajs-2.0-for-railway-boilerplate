"use client"

import React from "react"
import { RegionProvider } from "../lib/context/region-context"
import RegionModal from "../modules/common/components/region-modal"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RegionProvider>
      {children}
      <RegionModal />
    </RegionProvider>
  )
}
