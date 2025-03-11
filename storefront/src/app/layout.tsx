import "styles/globals.css"
import { ReactNode } from "react"
import { Metadata } from "next"
import { getBaseURL } from "@lib/util/env"
import Providers from "@lib/context/providers"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    template: "%s | JBS Builder Lic",
    default: "JBS Builder Lic - Dumpster Rental Services"
  },
  description: "Fast, reliable, and affordable dumpster rental services in Queens, Manhattan, Brooklyn, and Bronx.",
  openGraph: {
    type: "website",
    title: "JBS Builder Lic - Dumpster Rental Services",
    description: "Fast, reliable, and affordable dumpster rental services in Queens, Manhattan, Brooklyn, and Bronx.",
  }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
