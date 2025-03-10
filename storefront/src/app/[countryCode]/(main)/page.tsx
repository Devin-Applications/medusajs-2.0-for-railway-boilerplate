import { Metadata } from "next"
import HomeContent from "@modules/home/components/home-content"

export const metadata: Metadata = {
  title: "JBS Builder Lic - Dumpster Rental Services",
  description: "Fast, reliable, and affordable dumpster rental services in Queens, Manhattan, Brooklyn, and Bronx.",
}

export default function Home() {
  return <HomeContent />
}
