"use client"

import React, { useState } from "react"
import { Text } from "@medusajs/ui"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import ClientButton from "../client-button"
import Input from "../input"
import Image from "next/image"
import { RegionModalProps } from "./types"
import { regions } from "@lib/config/regions"
import X from "@modules/common/icons/x"

const RegionModal = ({ isOpen, onClose, onRegionSelect, onZipCodeSubmit }: RegionModalProps) => {
  const [zipCode, setZipCode] = useState("")
  const [errors, setErrors] = useState<Record<string, unknown>>({})
  const [touched, setTouched] = useState<Record<string, unknown>>({})

  const handleZipCodeSubmit = () => {
    if (zipCode.length < 5) {
      setErrors({ zip_code: "Please enter a valid ZIP code" })
      setTouched({ zip_code: true })
      return
    }
    onZipCodeSubmit?.(zipCode)
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="flex items-center justify-between mb-4">
                  <Text className="text-xl font-semibold">Select Your Service Area</Text>
                  <button
                    onClick={onClose}
                    className="rounded-full p-1 hover:bg-gray-100 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </Dialog.Title>

                <Dialog.Description className="text-gray-600 mb-6">
                  Please select your service area or enter your ZIP code to help us provide you with the most relevant information.
                </Dialog.Description>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    {regions.map((region) => (
                      <div 
                        key={region.name}
                        className="flex flex-col items-center p-4 border rounded-lg cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-colors"
                        onClick={() => onRegionSelect?.(region.name)}
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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default RegionModal
