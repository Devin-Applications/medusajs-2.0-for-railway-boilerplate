"use client"

import dynamic from "next/dynamic"

const Hero = dynamic(() => import("@modules/home/components/hero"))
const Services = dynamic(() => import("@modules/home/components/services"))
const UseCases = dynamic(() => import("@modules/home/components/use-cases"))
const ServiceAreas = dynamic(() => import("@modules/home/components/service-areas"))
const WhyChooseUs = dynamic(() => import("@modules/home/components/why-choose-us"))
const CallToAction = dynamic(() => import("@modules/home/components/call-to-action"))
const ContactForm = dynamic(() => import("@modules/common/components/contact-form"))

export default function ClientHome() {
  return (
    <div className="flex flex-col gap-y-8">
      <Hero />
      <Services />
      <UseCases />
      <ServiceAreas />
      <WhyChooseUs />
      <CallToAction />
      <ContactForm />
    </div>
  )
}
