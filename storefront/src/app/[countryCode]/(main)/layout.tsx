import { ReactNode } from "react"
import dynamic from "next/dynamic"

const ClientPageLayout = dynamic(() => import("../client-layout"), { ssr: false })

export default function PageLayout({ children }: { children: ReactNode }) {
  return <ClientPageLayout>{children}</ClientPageLayout>
}
