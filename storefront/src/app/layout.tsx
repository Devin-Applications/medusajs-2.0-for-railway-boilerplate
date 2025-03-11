import "styles/globals.css"
import { ReactNode } from "react"
import { metadata } from "./metadata-config"
import dynamic from "next/dynamic"

const Providers = dynamic(() => import("@lib/context/providers"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen flex-col">
      <div className="relative flex-grow">Loading...</div>
    </div>
  )
})

export { metadata }

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <main className="relative">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  )
}
