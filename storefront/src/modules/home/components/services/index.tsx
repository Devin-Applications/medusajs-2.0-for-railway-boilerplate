"use client"

import { Heading, Text, Button } from "@medusajs/ui"
import LocalizedClientLink from "../../../../modules/common/components/localized-client-link"
import React, { useState } from "react"
import Image from "next/image"
import useToggleState from "@lib/hooks/use-toggle-state"
import PhonePopup from "./phone-popup"

const Services = () => {
  const { state: isPhonePopupOpen, open: openPhonePopup, close: closePhonePopup } = useToggleState(false)
  const [selectedService, setSelectedService] = useState("")

  const services = [
    {
      id: "10-yard",
      title: "10 Yard Dumpster",
      description: "Perfect for small home projects",
      details: ["Holds approx. 3 pickup truck loads"],
      image: "/images/dumpster.jpg",
      link: "/services/10-yard",
    },
    {
      id: "15-yard",
      title: "15 Yard Dumpster",
      description: "Ideal for medium renovation projects",
      details: ["Holds approx. 4 pickup truck loads"],
      image: "/images/dumpster.jpg",
      link: "/services/15-yard",
    },
    {
      id: "20-yard",
      title: "20 Yard Dumpster",
      description: "Great for large home cleanouts",
      details: ["Holds approx. 6 pickup truck loads"],
      image: "/images/dumpster.jpg",
      link: "/services/20-yard",
    },
    {
      id: "30-yard",
      title: "30 Yard Dumpster",
      description: "Perfect for construction projects",
      details: ["Holds approx. 10 pickup truck loads"],
      image: "/images/dumpster.jpg",
      link: "/services/30-yard",
    },
    {
      id: "40-yard",
      title: "40 Yard Dumpster",
      description: "Ideal for commercial projects",
      details: ["Holds approx. 14 pickup truck loads"],
      image: "/images/dumpster.jpg",
      link: "/services/40-yard",
    },
  ]

  return (
    <div id="services" className="py-16 bg-white">
      <div className="content-container">
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16 px-4">
          <Heading level="h2" className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-5 text-grey-90">
            Our Dumpster Rental Services
          </Heading>
          <Text className="text-grey-60 max-w-2xl text-base sm:text-lg">
            We offer a variety of dumpster sizes to meet your specific needs. Whether you're cleaning out your garage or managing a large construction project, we have the right solution for you.
          </Text>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 sm:gap-10 xl:gap-12 px-4 sm:px-6 lg:px-8">
          {services.map((service) => (
            <div key={service.id} className="flex flex-col bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-grey-10/50 hover:border-orange-500/20">
              <div className="h-52 sm:h-60 bg-grey-5 flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-4 right-4 z-10 bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow">
                  {service.id.split('-')[0]} YD
                </div>
                <Image 
                  src={service.image} 
                  alt={service.title} 
                  fill 
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 sm:p-7 flex-grow flex flex-col">
                <Heading level="h3" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-grey-90">
                  {service.title}
                </Heading>
                <Text className="text-grey-60 mb-4 sm:mb-5 text-base">
                  {service.description}
                </Text>
                <ul className="mb-6 sm:mb-7 space-y-3 flex-grow">
                  {service.details.map((detail, index) => (
                    <li key={index} className="flex items-start text-grey-70 text-base">
                      <span className="mr-2.5 text-orange-500 text-lg font-bold">✓</span>
                      {detail}
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="secondary" 
                  className="w-full bg-orange-500 text-white hover:bg-orange-600 transition-all py-4 px-6 text-base font-semibold rounded-lg shadow hover:shadow-lg active:transform active:scale-[0.98]" 
                  onClick={() => {
                    setSelectedService(service.id)
                    openPhonePopup()
                  }}
                >
                  Book Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <PhonePopup isOpen={isPhonePopupOpen} close={closePhonePopup} />
    </div>
  )
}

export default Services
