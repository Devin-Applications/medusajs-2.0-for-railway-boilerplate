"use client"

import { Button, Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useState } from "react"
import Input from "@modules/common/components/input"
import { AREA_PHONE_NUMBERS, ServiceArea, getAreaFromPincode } from "@lib/area-constants"
import AreaSelect from "@modules/common/components/area-select"

const Hero = () => {
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
    <div className="h-[85vh] w-full border-b border-ui-border-base relative bg-grey-5">
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <span>
          <Heading
            level="h1"
            className="text-4xl leading-10 text-grey-90 font-bold mb-4"
          >
            JBS Builder Lic Dumpster Rental Services
          </Heading>
          <Heading
            level="h2"
            className="text-2xl leading-8 text-grey-60 font-normal mb-6"
          >
            Fast, Reliable, and Convenient Waste Management Solutions in NYC
          </Heading>
          <p className="text-lg text-grey-50 mb-8 max-w-2xl mx-auto">
            Get the dumpster you need fast and at an affordable price! Serving Queens, Manhattan, Brooklyn, and Bronx with same-day delivery available.
          </p>
        </span>
        <div className="flex flex-col gap-4 w-full max-w-md mx-auto mb-6">
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
          <AreaSelect
            placeholder="Select Your Area"
            onChange={handleAreaChange}
            value={selectedArea}
            className="bg-white text-grey-90"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" size="large" className="bg-grey-90 hover:bg-grey-80 px-8 py-3" asChild>
            <LocalizedClientLink href="/services">View Services</LocalizedClientLink>
          </Button>
          <Button variant="secondary" size="large" className="bg-white text-grey-90 hover:bg-grey-10 px-8 py-3 text-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105" asChild>
            <a href={`tel:${phoneNumber.replace(/\D/g, '')}`}>CALL NOW {phoneNumber}</a>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Hero
