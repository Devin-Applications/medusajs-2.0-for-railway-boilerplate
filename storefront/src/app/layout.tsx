import "styles/globals.css"
import { ReactNode } from "react"
import { metadata } from "./metadata-config"

export { metadata }

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>{children}</body>
    </html>
  )
}
