import "styles/globals.css"
import { ReactNode } from "react"
import dynamic from "next/dynamic"
import { metadata } from "./metadata-config"

export { metadata }

const Providers = dynamic(() => import("@lib/context/providers"), { 
  ssr: false,
  loading: () => (
    <html lang="en" data-mode="light">
      <body>
        <div className="flex min-h-screen flex-col">
          <div className="relative flex-grow">Loading...</div>
        </div>
      </body>
    </html>
  )
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
