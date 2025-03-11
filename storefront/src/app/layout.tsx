import "styles/globals.css"
import { ReactNode } from "react"
import dynamic from "next/dynamic"
import { metadata } from "./metadata-config"

export { metadata }

const ClientRootLayout = dynamic(() => import("./client-root-layout"), { ssr: false })

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <ClientRootLayout>{children}</ClientRootLayout>
      </body>
    </html>
  )
}
