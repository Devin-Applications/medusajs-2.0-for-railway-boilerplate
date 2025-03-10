import { Metadata } from "next"
import { getBaseURL } from "@lib/util/env"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: "JBS Builder Lic - Dumpster Rental Services",
  description: "Fast, reliable, and affordable dumpster rental services in Queens, Manhattan, Brooklyn, and Bronx.",
}
