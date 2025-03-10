"use client"

import { Heading, Text, Button } from "@medusajs/ui"
import React, { useState } from "react"
import { AREA_PHONE_NUMBERS, SERVICE_AREAS, ServiceArea, getAreaFromPincode } from "../../../../lib/area-constants"
import NativeSelect from "../../../common/components/native-select"
import Input from "../../../common/components/input"

const CallToAction = () => {
  const [selectedArea, setSelectedArea] = useState<ServiceArea>("")
  const [phoneNumber, setPhoneNumber] = useState<(typeof AREA_PHONE_NUMBERS)[ServiceArea]>(AREA_PHONE_NUMBERS[""])
  const [pincode, setPincode] = useState("")

  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPincode = e.target.value
    setPincode(newPincode)
    const area = getAreaFromPincode(newPincode)
    setSelectedArea(area)
    setPhoneNumber(AREA_PHONE_NUMBERS[area] || AREA_PHONE_NUMBERS[""])
  }

  const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const area = e.target.value as ServiceArea
    setSelectedArea(area)
    setPhoneNumber(AREA_PHONE_NUMBERS[area] || AREA_PHONE_NUMBERS[""])
    setPincode("")
  }

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
            <div className="mb-6 max-w-xs mx-auto md:mx-0">
              <div className="grid grid-cols-1 gap-4">
                <Input
                  label="Enter Your Pincode"
                  name="pincode"
                  type="text"
                  pattern="[0-9]{5}"
                  maxLength={5}
                  value={pincode}
                  onChange={handlePincodeChange}
                  className="bg-white text-grey-90"
                />
                <NativeSelect
                  placeholder="Select Your Area"
                  onChange={handleAreaChange}
                  value={selectedArea}
                  className="bg-white text-grey-90"
                >
                  {SERVICE_AREAS.map(({ value, label }, index) => (
                    <option key={index} value={value}>
                      {label}
                    </option>
                  ))}
                </NativeSelect>
              </div>
            </div>
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
