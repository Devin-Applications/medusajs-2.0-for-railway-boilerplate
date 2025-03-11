import { ReactNode } from "react"
import dynamic from "next/dynamic"

const CountryClientLayout = dynamic(() => import("./client-layout"), { 
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen flex-col">
      <div className="relative flex-grow">Loading...</div>
    </div>
  )
})

export default function CountryLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <CountryClientLayout>{children}</CountryClientLayout>
    </div>
  )
}
