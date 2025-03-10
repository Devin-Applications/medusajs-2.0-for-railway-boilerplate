import { Metadata } from "next"
import Link from "next/link"
import { STORE_NAME } from "@lib/constants"

export const metadata: Metadata = {
  title: `Page Not Found | ${STORE_NAME} - NYC Dumpster Rental`,
  description: "The page you are looking for does not exist. Browse our dumpster rental services in Queens, Brooklyn, Manhattan, and Bronx. Fast delivery and competitive pricing.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] py-32 px-4">
      <h1 className="text-2xl-semi mb-4 text-ui-fg-base">404 - Page Not Found</h1>
      <p className="text-base-regular mb-8 text-center max-w-lg text-ui-fg-base">
        Sorry, we couldn't find the page you're looking for. Browse our dumpster rental services in Queens, Brooklyn, Manhattan, and Bronx for your construction, demolition, or renovation needs.
      </p>
      <Link
        href="/"
        className="btn-ui bg-blue-600 text-white px-6 py-3 rounded-lg hover:opacity-80 transition-opacity duration-200"
      >
        Return to Homepage
      </Link>
    </div>
  )
}
