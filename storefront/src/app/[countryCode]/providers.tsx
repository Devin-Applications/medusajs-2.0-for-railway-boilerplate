"use client"

import { ReactNode } from "react"
import dynamic from "next/dynamic"

const ClientLayout = dynamic(() => import("@app/[countryCode]/(main)/client-layout"), { ssr: false })

export default function Providers({ children }: { children: ReactNode }) {
  return <ClientLayout>{children}</ClientLayout>
}
