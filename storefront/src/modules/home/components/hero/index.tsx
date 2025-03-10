import { Button, Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { STORE_NAME } from "@lib/constants"

const Hero = () => {
  return (
    <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-blue-50">
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <span>
          <Heading
            level="h1"
            className="text-4xl leading-10 text-blue-800 font-bold mb-4"
          >
            Affordable Dumpster Rental Services
          </Heading>
          <Heading
            level="h2"
            className="text-2xl leading-8 text-blue-600 font-normal mb-6"
          >
            Fast, Reliable, and Convenient Waste Management Solutions
          </Heading>
          <p className="text-lg text-blue-700 mb-8 max-w-2xl mx-auto">
            {STORE_NAME} provides dumpster rentals for residential, commercial, and construction projects. 
            We offer competitive pricing, flexible rental periods, and prompt delivery and pickup.
          </p>
        </span>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" size="large" className="bg-red-600 hover:bg-red-700" asChild>
            <LocalizedClientLink href="/services">View Services</LocalizedClientLink>
          </Button>
          <Button variant="secondary" size="large" className="border-blue-600 text-blue-600 hover:bg-blue-50" asChild>
            <a href="tel:5165151951">Call Now: (516) 515-1951</a>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Hero
