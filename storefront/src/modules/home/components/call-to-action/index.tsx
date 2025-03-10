"use client"

import { Heading, Text, Button } from "@medusajs/ui"
import React, { useState } from "react"
import { AREA_PHONE_NUMBERS } from "../../../../lib/area-constants"

const CallToAction = () => {
  const phoneNumber = AREA_PHONE_NUMBERS[""] // Default phone number

  return (
    <div className="py-12 md:py-24 bg-grey-90 text-white">
      <div className="content-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="flex-1 text-center md:text-left">
            <Heading level="h2" className="text-4xl md:text-5xl font-bold mb-6 md:mb-8 text-white">
              Need a Dumpster Fast? Call Now!
            </Heading>
            <Text className="text-grey-10 mb-8 md:mb-10 max-w-xl text-lg md:text-xl leading-relaxed">
              Looking for a reliable and affordable dumpster rental in NYC? At JBS Builder Lic, we make dumpster rental simple and convenient. Same-day delivery available in Queens, Manhattan, Brooklyn, and Bronx! Prices starting at $299.
            </Text>

            <Button variant="secondary" className="bg-white text-grey-90 hover:bg-grey-10 px-6 sm:px-8 md:px-16 py-4 md:py-6 text-xl md:text-3xl font-bold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 rounded-xl w-full md:w-auto" asChild>
              <a href={`tel:${phoneNumber.replace(/\D/g, '')}`}>CALL NOW {phoneNumber}</a>
            </Button>
          </div>
          <div className="flex-1 flex justify-center mt-8 md:mt-0">
            <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-grey-80 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform border-4 sm:border-8 md:border-12 border-grey-70">
              <span className="text-[6rem] sm:text-[8rem] md:text-[12rem]">🗑️</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CallToAction
