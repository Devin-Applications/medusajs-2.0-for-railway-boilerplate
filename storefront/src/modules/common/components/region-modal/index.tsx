"use client"

import React, { useState } from "react"
import { Text } from "@medusajs/ui"
import { Dialog } from "@headlessui/react"
import ClientButton from "../client-button"
import { useRegion } from "@lib/context/region-context"
import { regions } from "@lib/config/regions"
import Input from "../input"
import Image from "next/image"
import dynamic from "next/dynamic"
import X from "@modules/common/icons/x"

const Modal = dynamic(() => import("../modal"), { ssr: false })

interface RegionModalProps {
  isOpen: boolean
  onClose: () => void
}

const RegionModal = ({ isOpen, onClose }: RegionModalProps) => {
  const { setRegionByName, setRegionByZipCode } = useRegion()
  const [zipCode, setZipCode] = useState("")
  const [errors, setErrors] = useState<Record<string, unknown>>({})
  const [touched, setTouched] = useState<Record<string, unknown>>({})
  
  // Reset state when modal opens/closes
  React.useEffect(() => {
    if (!isOpen) {
      setZipCode("")
      setErrors({})
      setTouched({})
    }
  }, [isOpen])

  const handleZipCodeSubmit = () => {
    if (zipCode.length < 5) {
      setErrors({ zip_code: "Please enter a valid ZIP code" })
      setTouched({ zip_code: true })
      return
    }
    
    setErrors({})
    setTouched({})
    setRegionByZipCode(zipCode)
    onClose()
  }

  const handleRegionSelect = (regionName: string) => {
    setRegionByName(regionName)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} close={onClose}>
      <Dialog.Title className="flex items-center justify-between mb-4">
        <div className="text-xl font-semibold">Select Your Service Area</div>
        <button
          onClick={onClose}
          className="rounded-full p-1 hover:bg-gray-100 transition-colors"
          data-testid="close-modal-button"
        >
          <X size={20} />
        </button>
      </Dialog.Title>
      <Dialog.Description className="text-gray-600 mb-6">
        Please select your service area or enter your ZIP code to help us provide you with the most relevant information.
      </Dialog.Description>
      <div className="space-y-4">
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
            <div className="mt-7">
              <ClientButton
                onClick={handleZipCodeSubmit}
                variant="primary"
              >
                Submit
              </ClientButton>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default RegionModal
