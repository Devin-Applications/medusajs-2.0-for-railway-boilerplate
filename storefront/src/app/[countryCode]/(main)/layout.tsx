import { ReactNode } from "react"
import dynamic from "next/dynamic"

const ClientLayout = dynamic(() => import("./client-layout"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen flex-col">
      <div className="relative flex-grow">Loading...</div>
    </div>
  )
})

export default function PageLayout({ children }: { children: ReactNode }) {
  return <ClientLayout>{children}</ClientLayout>
}
