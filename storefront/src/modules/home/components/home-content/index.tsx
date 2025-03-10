"use client"

import React from "react"
import Hero from "../hero"
import Services from "../services"
import UseCases from "../use-cases"
import ServiceAreas from "../service-areas"
import WhyChooseUs from "../why-choose-us"
import CallToAction from "../call-to-action"

export default function HomeContent() {
  return (
    <>
      <Hero />
      <Services />
      <UseCases />
      <ServiceAreas />
      <WhyChooseUs />
      <CallToAction />
    </>
  )
}
