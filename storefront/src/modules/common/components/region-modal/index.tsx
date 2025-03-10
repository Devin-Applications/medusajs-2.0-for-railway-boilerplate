"use client"

import React, { useState } from "react"
import { Button, Heading, Text } from "@medusajs/ui"
import { useRegion } from "@lib/context/region-context"
import { regions } from "@lib/config/regions"
import Input from "../input"
import Modal from "../modal"
import Image from "next/image"

const RegionModal = () => {
  const { showRegionModal, setShowRegionModal, setRegionByName, setRegionByZipCode } = useRegion()
  const [zipCode, setZipCode] = useState("")
  const [errors, setErrors] = useState<Record<string, unknown>>({})
  const [touched, setTouched] = useState<Record<string, unknown>>({})

  const handleZipCodeSubmit = () => {
    if (zipCode.length < 5) {
      setErrors({ zip_code: "Please enter a valid ZIP code" })
      setTouched({ zip_code: true })
      return
    }
    
    setErrors({})
    setTouched({})
    setRegionByZipCode(zipCode)
    setShowRegionModal(false)
  }

  const handleRegionSelect = (regionName: string) => {
    setRegionByName(regionName)
    setShowRegionModal(false)
  }

  return (
    <Modal isOpen={showRegionModal} close={() => setShowRegionModal(false)}>
      <Modal.Title>
        <Heading className="mb-2">Select Your Service Area</Heading>
      </Modal.Title>
      <Modal.Body>
        <Text className="text-grey-60 mb-6">
          Please select your service area or enter your ZIP code to help us provide you with the most relevant information.
        </Text>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          {regions.map((region) => (
            <div 
              key={region.name}
              className="flex flex-col items-center p-4 border rounded-lg cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-colors"
              onClick={() => handleRegionSelect(region.name)}
            >
              <div className="w-12 h-12 mb-2 bg-grey-5 rounded-full flex items-center justify-center">
                <Image src={`/icons/${region.name.toLowerCase()}.svg`} width={32} height={32} alt={region.name} />
              </div>
              <Text className="font-medium">{region.name}</Text>
            </div>
          ))}
        </div>
        
        <div className="border-t pt-6">
          <Text className="mb-4 font-medium">Or enter your ZIP code:</Text>
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                label="ZIP Code"
                name="zip_code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                errors={errors}
                touched={touched}
              />
            </div>
            <Button
              className="mt-7"
              onClick={handleZipCodeSubmit}
              variant="primary"
            >
              Submit
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default RegionModal
