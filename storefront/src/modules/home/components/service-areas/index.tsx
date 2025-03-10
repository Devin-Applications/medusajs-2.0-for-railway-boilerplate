import { Heading, Text } from "@medusajs/ui"
import React from "react"

const ServiceAreas = () => {
  const areas = [
    { id: 1, name: "Queens", description: "Same-day service available with flexible scheduling and competitive rates" },
    { id: 2, name: "Manhattan", description: "Fast delivery and pickup with special solutions for tight spaces" },
    { id: 3, name: "Brooklyn", description: "Reliable service with multiple dumpster size options" },
    { id: 4, name: "Bronx", description: "Prompt delivery and excellent customer service guaranteed" }
  ]

  return (
    <div className="py-16 bg-grey-5">
      <div className="content-container">
        <div className="flex flex-col items-center text-center mb-16">
          <Heading level="h2" className="text-4xl font-bold mb-6 text-grey-90">
            Our Service Areas
          </Heading>
          <Text className="text-grey-60 max-w-2xl text-lg">
            We provide fast, reliable dumpster rental services throughout New York City's boroughs.
          </Text>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {areas.map((area) => (
            <div key={area.id} className="flex flex-col p-8 bg-white rounded-lg shadow-sm hover:shadow-lg transition-all transform hover:scale-[1.02] min-h-[220px]">
              <Heading level="h3" className="text-3xl font-bold mb-4 text-grey-90">
                {area.name}
              </Heading>
              <Text className="text-grey-60 text-lg leading-relaxed">
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
