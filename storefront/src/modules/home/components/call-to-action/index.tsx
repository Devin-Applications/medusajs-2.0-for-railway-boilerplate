import { Heading, Text, Button } from "@medusajs/ui"
import React from "react"
import Image from "next/image"

const CallToAction = () => {
  return (
    <div className="py-16 bg-orange-500">
      <div className="content-container">
        <div className="flex flex-col md:flex-row items-center justify-between px-4 sm:px-0">
          <div className="flex-1 mb-8 md:mb-0 text-center md:text-left">
            <Heading level="h2" className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-white">
              Ready to Rent a Dumpster?
            </Heading>
            <Text className="text-white/90 mb-6 sm:mb-8 text-base sm:text-lg max-w-xl">
              Contact us today for fast, reliable dumpster rental services in NYC. We'll help you choose the right size for your project.
            </Text>
            <Button variant="secondary" size="large" className="bg-white text-orange-500 hover:bg-grey-5 transition-colors py-3 px-8 text-base sm:text-lg font-medium" asChild>
              <a href="tel:5165151951">CALL NOW: (516) 515-1951</a>
            </Button>
          </div>
          <div className="flex-1 flex justify-center mt-8 md:mt-0">
            <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-white rounded-full flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform border-4 sm:border-8 border-white relative overflow-hidden">
              <Image 
                src="/images/dumpster.jpg" 
                alt="Dumpster" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CallToAction
