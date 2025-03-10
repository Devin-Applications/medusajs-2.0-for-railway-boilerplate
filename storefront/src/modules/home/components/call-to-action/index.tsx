import { Heading, Text, Button } from "@medusajs/ui"
import React from "react"

const CallToAction = () => {
  return (
    <div className="py-24 bg-grey-90 text-white">
      <div className="content-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1">
            <Heading level="h2" className="text-5xl font-bold mb-8 text-white">
              Need a Dumpster Fast? Call Now!
            </Heading>
            <Text className="text-grey-10 mb-10 max-w-xl text-xl leading-relaxed">
              Looking for a reliable and affordable dumpster rental in NYC? At JBS Builder Lic, we make dumpster rental simple and convenient. Same-day delivery available in Queens, Manhattan, Brooklyn, and Bronx! Prices starting at $299.
            </Text>
            <Button variant="secondary" className="bg-white text-grey-90 hover:bg-grey-10 px-16 py-6 text-3xl font-bold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 rounded-xl" asChild>
              <a href="tel:5165151951">CALL NOW (516) 515-1951</a>
            </Button>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="w-96 h-96 bg-grey-80 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform border-12 border-grey-70">
              <span className="text-[12rem]">🗑️</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CallToAction
