import "styles/globals.css"
import { ReactNode } from "react"
import { metadata } from "./metadata-config"
import dynamic from "next/dynamic"

const ClientRootLayout = dynamic(() => import("./client-root-layout"), {
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
          <ClientRootLayout>{children}</ClientRootLayout>
        </main>
      </body>
    </html>
  )
}
