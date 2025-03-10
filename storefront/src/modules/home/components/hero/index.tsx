"use client"

import { Button, Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { STORE_NAME } from "@lib/constants"
import Image from "next/image"

const Hero = () => {
  return (
    <div className="h-[75vh] w-full border-b border-ui-border-base relative">
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/dumpster.jpg" 
          alt="Dumpster rental service" 
          fill 
          className="object-cover brightness-[0.75]"
          priority
        />
      </div>
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6 bg-gradient-to-br from-black/80 via-black/60 to-transparent">
        <span className="max-w-4xl px-4">
          <Heading
            level="h1"
            className="text-4xl sm:text-5xl lg:text-6xl leading-tight text-white font-bold mb-4 drop-shadow-lg"
          >
            JBS Builder Lic Dumpster Rental Services
          </Heading>
          <Heading
            level="h2"
            className="text-2xl sm:text-3xl lg:text-4xl leading-snug text-white/90 font-normal mb-6 drop-shadow-lg"
          >
            Fast, Reliable, and Convenient Waste Management Solutions in NYC
          </Heading>
          <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl mx-auto drop-shadow-lg">
            Get the dumpster you need fast and at an affordable price! Serving Queens, Manhattan, Brooklyn, and Bronx with same-day delivery available.
          </p>
        </span>
        <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
          <Button variant="primary" size="large" className="bg-orange-500 hover:bg-orange-600 px-8 py-4 text-white font-medium shadow-lg hover:shadow-xl transition-all transform hover:scale-105" asChild>
            <a href="#services" onClick={(e) => {
              e.preventDefault()
              document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
            }}>View Services</a>
          </Button>
          <Button variant="primary" size="large" className="bg-orange-500 hover:bg-orange-600 px-8 py-4 text-white font-medium shadow-lg hover:shadow-xl transition-all transform hover:scale-105" asChild>
            <a href="tel:5165151951">CALL TODAY (516) 515-1951</a>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Hero
