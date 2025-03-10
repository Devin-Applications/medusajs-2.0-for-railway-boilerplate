import { Metadata } from "next"
import Script from "next/script"
import { STORE_NAME } from "@lib/constants"
import { createLocalBusinessSchema, createOrganizationSchema } from "@lib/util/structured-data"

import Hero from "@modules/home/components/hero"
import Services from "@modules/home/components/services"
import UseCases from "@modules/home/components/use-cases"
import ServiceAreas from "@modules/home/components/service-areas"
import WhyChooseUs from "@modules/home/components/why-choose-us"
import CallToAction from "@modules/home/components/call-to-action"

export const metadata: Metadata = {
  title: `${STORE_NAME} - NYC Dumpster Rental Services | Queens, Brooklyn, Manhattan, Bronx`,
  description: "Top-rated dumpster rental in NYC. 10-40 yard dumpsters for construction, demolition, renovation & cleanouts. Same-day delivery in Queens, Brooklyn, Manhattan & Bronx. HOA-friendly service.",
  keywords: [
    "dumpster rental NYC",
    "roll off dumpster Queens",
    "construction dumpster Brooklyn",
    "waste container rental Manhattan",
    "debris removal Bronx",
    "10 yard dumpster rental",
    "20 yard dumpster rental",
    "30 yard dumpster rental",
    "40 yard dumpster rental",
    "residential dumpster rental",
    "commercial dumpster rental",
    "construction waste removal",
    "demolition dumpster rental",
    "renovation waste container",
    "HOA friendly dumpster service",
    "same day dumpster delivery NYC"
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${STORE_NAME} - NYC Dumpster Rental Services | Queens, Brooklyn, Manhattan, Bronx`,
    description: "Top-rated dumpster rental in NYC. 10-40 yard dumpsters for construction, demolition, renovation & cleanouts. Same-day delivery in Queens, Brooklyn, Manhattan & Bronx. HOA-friendly service.",
    url: "/",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "JBS Builder Lic Dumpster Rental Services - NYC's Premier Waste Management Solution",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${STORE_NAME} - NYC Dumpster Rental Services`,
    description: "Top-rated dumpster rental in NYC. 10-40 yard dumpsters for construction, demolition, renovation & cleanouts. Same-day delivery in Queens, Brooklyn, Manhattan & Bronx.",
    images: ["/images/og-image.jpg"],
  }
}

export default function Home() {
  // Structured data for the homepage
  const organizationSchema = createOrganizationSchema()
  const localBusinessSchema = createLocalBusinessSchema()
  
  return (
    <>
      {/* JSON-LD structured data */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      
      <Hero />
      <Services />
      <UseCases />
      <ServiceAreas />
      <WhyChooseUs />
      <CallToAction />
    </>
  )
}
