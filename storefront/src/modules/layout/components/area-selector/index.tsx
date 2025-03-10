"use client"

import React, { useState } from "react"
import { Button } from "@medusajs/ui"
import Input from "../../../common/components/input"
import NativeSelect from "../../../common/components/native-select"
import { AREA_PHONE_NUMBERS, ServiceArea, getAreaFromPincode } from "../../../../lib/area-constants"

const AreaSelector = () => {
  const [selectedArea, setSelectedArea] = useState<ServiceArea>("")
  const [phoneNumber, setPhoneNumber] = useState<(typeof AREA_PHONE_NUMBERS)[ServiceArea]>(AREA_PHONE_NUMBERS[""])
  const [pincode, setPincode] = useState("")
  const [inputMethod, setInputMethod] = useState<"area" | "pincode">("area")

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
    <div className="flex flex-col md:flex-row items-center gap-2 p-2 md:p-0">
      <NativeSelect
        value={inputMethod}
        onChange={(e) => {
          setInputMethod(e.target.value as "area" | "pincode")
          setPincode("")
          setSelectedArea("")
          setPhoneNumber(AREA_PHONE_NUMBERS[""])
        }}
        className="w-full md:w-24 bg-white text-grey-90 text-sm mb-2 md:mb-0"
      >
        <option value="area">By Area</option>
        <option value="pincode">By Pincode</option>
      </NativeSelect>

      {inputMethod === "area" ? (
        <NativeSelect
          placeholder="Select Your Area"
          onChange={handleAreaChange}
          value={selectedArea}
          className="w-full md:w-32 bg-white text-grey-90 text-sm mb-2 md:mb-0"
        >
          <option value="">Select Area</option>
          <option value="Queens">Queens</option>
          <option value="Manhattan">Manhattan</option>
          <option value="Brooklyn">Brooklyn</option>
          <option value="Bronx">Bronx</option>
        </NativeSelect>
      ) : (
        <Input
          label="Enter Pincode"
          name="pincode"
          type="text"
          pattern="[0-9]{5}"
          maxLength={5}
          value={pincode}
          onChange={handlePincodeChange}
          className="w-full md:w-32 bg-white text-grey-90 text-sm mb-2 md:mb-0"
        />
      )}

      <Button variant="secondary" size="small" className="w-full md:w-auto bg-white text-grey-90 hover:bg-grey-10 text-sm" asChild>
        <a href={`tel:${phoneNumber.replace(/\D/g, '')}`}>📞 {phoneNumber}</a>
      </Button>
    </div>
  )
}

export default AreaSelector
