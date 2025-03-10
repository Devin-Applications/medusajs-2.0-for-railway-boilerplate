import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { STORE_NAME } from "@lib/constants"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    template: `%s | ${STORE_NAME}`,
    default: `${STORE_NAME} - Dumpster Rental Services in NYC`,
  },
  description: "Fast, reliable, and affordable dumpster rental services in Queens, Manhattan, Brooklyn, and Bronx. Serving all NYC boroughs with 10-40 yard dumpsters.",
  keywords: ["dumpster rental", "NYC dumpster rental", "construction waste removal", "Queens dumpster rental", "Brooklyn dumpster rental", "Manhattan dumpster rental", "Bronx dumpster rental", "10 yard dumpster", "20 yard dumpster", "30 yard dumpster", "40 yard dumpster"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: getBaseURL(),
    siteName: STORE_NAME,
    title: `${STORE_NAME} - Dumpster Rental Services in NYC`,
    description: "Fast, reliable, and affordable dumpster rental services in Queens, Manhattan, Brooklyn, and Bronx. Serving all NYC boroughs with 10-40 yard dumpsters.",
    images: [
      {
        url: `${getBaseURL()}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "JBS Builder Lic Dumpster Rental Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${STORE_NAME} - Dumpster Rental Services in NYC`,
    description: "Fast, reliable, and affordable dumpster rental services in Queens, Manhattan, Brooklyn, and Bronx. Serving all NYC boroughs with 10-40 yard dumpsters.",
    images: [`${getBaseURL()}/images/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "google-site-verification-code", // Replace with actual verification code
  },
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
