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
          className="object-cover brightness-50"
          priority
        />
      </div>
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6 bg-gradient-to-b from-black/50 to-black/70">
        <span className="max-w-4xl">
          <Heading
            level="h1"
            className="text-4xl leading-10 text-white font-bold mb-4 drop-shadow-md"
          >
            JBS Builder Lic Dumpster Rental Services
          </Heading>
          <Heading
            level="h2"
            className="text-2xl leading-8 text-white/90 font-normal mb-6 drop-shadow-md"
          >
            Fast, Reliable, and Convenient Waste Management Solutions in NYC
          </Heading>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto drop-shadow-md">
            Get the dumpster you need fast and at an affordable price! Serving Queens, Manhattan, Brooklyn, and Bronx with same-day delivery available.
          </p>
        </span>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" size="large" className="bg-orange-500 hover:bg-orange-600 px-8 py-3 text-white font-medium" asChild>
            <LocalizedClientLink href="/services">View Services</LocalizedClientLink>
          </Button>
          <Button variant="secondary" size="large" className="border-white text-white hover:bg-white/10 font-medium" asChild>
            <a href="tel:5165151951">CALL TODAY (516) 515-1951</a>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Hero
