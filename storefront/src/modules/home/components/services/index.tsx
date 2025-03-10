import { Heading, Text, Button } from "@medusajs/ui"
import LocalizedClientLink from "../../../../modules/common/components/localized-client-link"
import React from "react"
import Image from "next/image"

const Services = () => {
  const services = [
    {
      id: "10-yard",
      title: "10 Yard Dumpster",
      description: "Perfect for small home projects",
      details: ["1.5 Tons of Disposal Included", "Holds approx. 3 pickup truck loads", "$399 - 14 Day Rental"],
      image: "/images/dumpster.jpg",
      link: "/services/10-yard",
    },
    {
      id: "15-yard",
      title: "15 Yard Dumpster",
      description: "Ideal for medium renovation projects",
      details: ["2 Tons of Disposal Included", "Holds approx. 4 pickup truck loads", "$450 - 14 Day Rental"],
      image: "/images/dumpster.jpg",
      link: "/services/15-yard",
    },
    {
      id: "20-yard",
      title: "20 Yard Dumpster",
      description: "Great for large home cleanouts",
      details: ["3 Tons of Disposal Included", "Holds approx. 6 pickup truck loads", "$499 - 14 Day Rental"],
      image: "/images/dumpster.jpg",
      link: "/services/20-yard",
    },
    {
      id: "30-yard",
      title: "30 Yard Dumpster",
      description: "Perfect for construction projects",
      details: ["5 Tons of Disposal Included", "Holds approx. 10 pickup truck loads", "$575 - 14 Day Rental"],
      image: "/images/dumpster.jpg",
      link: "/services/30-yard",
    },
    {
      id: "40-yard",
      title: "40 Yard Dumpster",
      description: "Ideal for commercial projects",
      details: ["5 Tons of Disposal Included", "Holds approx. 14 pickup truck loads", "$699 - 14 Day Rental"],
      image: "/images/dumpster.jpg",
      link: "/services/40-yard",
    },
  ]

  return (
    <div className="py-16 bg-white">
      <div className="content-container">
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16 px-4">
          <Heading level="h2" className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-5 text-grey-90">
            Our Dumpster Rental Services
          </Heading>
          <Text className="text-grey-60 max-w-2xl text-base sm:text-lg">
            We offer a variety of dumpster sizes to meet your specific needs. Whether you're cleaning out your garage or managing a large construction project, we have the right solution for you.
          </Text>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8 px-4 sm:px-0">
          {services.map((service) => (
            <div key={service.id} className="flex flex-col bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all transform hover:scale-[1.02] border border-grey-10">
              <div className="h-40 sm:h-48 bg-grey-5 flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-2 right-2 z-10 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {service.id.split('-')[0]} YD
                </div>
                <Image 
                  src={service.image} 
                  alt={service.title} 
                  fill 
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-5 sm:p-6 flex-grow flex flex-col">
                <Heading level="h3" className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-grey-90">
                  {service.title}
                </Heading>
                <Text className="text-grey-60 mb-4 sm:mb-5 text-base">
                  {service.description}
                </Text>
                <ul className="mb-5 sm:mb-6 space-y-2 flex-grow">
                  {service.details.map((detail, index) => (
                    <li key={index} className="flex items-start text-grey-70 text-base">
                      <span className="mr-2 text-orange-500 text-lg">✓</span>
                      {detail}
                    </li>
                  ))}
                </ul>
                <Button variant="secondary" className="w-full bg-orange-500 text-white hover:bg-orange-600 transition-colors py-3 text-base font-medium rounded-lg" asChild>
                  <LocalizedClientLink href={service.link}>
                    Book Now
                  </LocalizedClientLink>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Services
