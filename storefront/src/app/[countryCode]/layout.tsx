import { ReactNode } from "react"
import dynamic from "next/dynamic"

const Providers = dynamic(() => import("./providers"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen flex-col">
      <div className="relative flex-grow">Loading...</div>
    </div>
  )
})

export default function CountryLayout({ children }: { children: ReactNode }) {
  return <Providers>{children}</Providers>
}
