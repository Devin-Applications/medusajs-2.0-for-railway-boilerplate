import { Heading, Text } from "@medusajs/ui"
import React from "react"
import Image from "next/image"

const ServiceAreas = () => {
  const areas = [
    { 
      id: 1, 
      name: "Queens", 
      description: "Same-day service available with flexible scheduling and competitive rates",
      icon: "/icons/queens.svg" 
    },
    { 
      id: 2, 
      name: "Manhattan", 
      description: "Fast delivery and pickup with special solutions for tight spaces",
      icon: "/icons/manhattan.svg" 
    },
    { 
      id: 3, 
      name: "Brooklyn", 
      description: "Reliable service with multiple dumpster size options",
      icon: "/icons/brooklyn.svg" 
    },
    { 
      id: 4, 
      name: "Bronx", 
      description: "Prompt delivery and excellent customer service guaranteed",
      icon: "/icons/bronx.svg" 
    }
  ]

  return (
    <div className="py-16 bg-grey-5 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 z-0 bg-gradient-to-br from-orange-50 to-orange-100"></div>
      <div className="content-container relative z-10">
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16 px-4">
          <Heading level="h2" className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-grey-90">
            Our Service Areas
          </Heading>
          <Text className="text-grey-60 max-w-2xl text-base sm:text-lg">
            We provide fast, reliable dumpster rental services throughout New York City's boroughs.
          </Text>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 px-4 sm:px-0">
          {areas.map((area) => (
            <div key={area.id} className="flex flex-col p-6 sm:p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition-all transform hover:scale-[1.02] border-t-4 border-orange-500">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 mr-4 bg-grey-5 rounded-full flex items-center justify-center">
                  <Image src={area.icon} width={32} height={32} alt={area.name} />
                </div>
                <Heading level="h3" className="text-2xl sm:text-3xl font-bold text-grey-90">
                  {area.name}
                </Heading>
              </div>
              <Text className="text-grey-60 text-base sm:text-lg leading-relaxed">
                {area.description}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ServiceAreas
