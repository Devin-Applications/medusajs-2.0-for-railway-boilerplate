import React from "react"
import ClientWrapper from "./client-wrapper"

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ClientWrapper>
      {children}
    </ClientWrapper>
  )
}
