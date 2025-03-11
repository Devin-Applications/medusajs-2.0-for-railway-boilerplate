import { Metadata } from "next"
import { Suspense } from "react"
import dynamic from "next/dynamic"

export const metadata: Metadata = {
  title: "JBS Builder Lic - Dumpster Rental Services",
  description: "Fast, reliable, and affordable dumpster rental services in Queens, Manhattan, Brooklyn, and Bronx.",
}

const Hero = dynamic(() => import("@modules/home/components/hero"), { ssr: false })
const Services = dynamic(() => import("@modules/home/components/services"), { ssr: false })
const UseCases = dynamic(() => import("@modules/home/components/use-cases"), { ssr: false })
const ServiceAreas = dynamic(() => import("@modules/home/components/service-areas"), { ssr: false })
const WhyChooseUs = dynamic(() => import("@modules/home/components/why-choose-us"), { ssr: false })
const CallToAction = dynamic(() => import("@modules/home/components/call-to-action"), { ssr: false })
const ContactForm = dynamic(() => import("@modules/common/components/contact-form"), { ssr: false })

export default function Home() {
  return (
    <Suspense>
      <Hero />
      <Services />
      <UseCases />
      <ServiceAreas />
      <WhyChooseUs />
      <CallToAction />
      <ContactForm />
    </Suspense>
  )
}
