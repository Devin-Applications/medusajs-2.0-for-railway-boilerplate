import "styles/globals.css"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "JBS Builder Lic - Dumpster Rental Services",
  description: "Fast, reliable, and affordable dumpster rental services in Queens, Manhattan, Brooklyn, and Bronx.",
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        {props.children}
      </body>
    </html>
  )
}
