"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"

const Hero = dynamic(() => import("@modules/home/components/hero").then(mod => mod.default), { ssr: false })
const Services = dynamic(() => import("@modules/home/components/services").then(mod => mod.default), { ssr: false })
const UseCases = dynamic(() => import("@modules/home/components/use-cases").then(mod => mod.default), { ssr: false })
const ServiceAreas = dynamic(() => import("@modules/home/components/service-areas").then(mod => mod.default), { ssr: false })
const WhyChooseUs = dynamic(() => import("@modules/home/components/why-choose-us").then(mod => mod.default), { ssr: false })
const CallToAction = dynamic(() => import("@modules/home/components/call-to-action").then(mod => mod.default), { ssr: false })
const ContactForm = dynamic(() => import("@modules/common/components/contact-form").then(mod => mod.default), { ssr: false })

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
