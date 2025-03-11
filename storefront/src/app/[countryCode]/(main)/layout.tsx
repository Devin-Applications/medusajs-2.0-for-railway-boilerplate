import { ReactNode } from "react"
import dynamic from "next/dynamic"

export default function PageLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
