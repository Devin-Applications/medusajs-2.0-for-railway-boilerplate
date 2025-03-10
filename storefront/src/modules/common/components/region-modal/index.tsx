"use client"

import React, { useState } from "react"
import { Button, Heading, Text } from "@medusajs/ui"
import { useRegion } from "@lib/context/region-context"
import { regions } from "@lib/config/regions"
import Input from "../input"
import { Dialog, Transition } from "@headlessui/react"
import Image from "next/image"

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
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 mb-2">
                Select Your Service Area
              </Dialog.Title>
              <div className="mt-2">
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
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default RegionModal
