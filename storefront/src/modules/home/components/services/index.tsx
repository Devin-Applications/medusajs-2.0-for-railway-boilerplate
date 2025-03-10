import { Heading, Text, Button } from "@medusajs/ui"
import LocalizedClientLink from "../../../../modules/common/components/localized-client-link"
import React from "react"

const Services = () => {
  const services = [
    {
      id: "15-yard",
      title: "15 Yard Dumpster",
      description: "Holds approx. 4 pickup truck loads",
      details: ["2 Tons of Disposal Included", "$450 - 14 Day Rental"],
      image: "🗑️",
      link: "/services/15-yard",
    },
    {
      id: "20-yard",
      title: "20 Yard Dumpster",
      description: "Holds approx. 6 pickup truck loads",
      details: ["3 Tons of Disposal Included", "$499 - 14 Day Rental"],
      image: "🗑️",
      link: "/services/20-yard",
    },
    {
      id: "30-yard",
      title: "30 Yard Dumpster",
      description: "Holds approx. 10 pickup truck loads",
      details: ["5 Tons of Disposal Included", "$575 - 14 Day Rental"],
      image: "🗑️",
      link: "/services/30-yard",
    },
    {
      id: "40-yard",
      title: "40 Yard Dumpster",
      description: "Holds approx. 14 pickup truck loads",
      details: ["5 Tons of Disposal Included", "$699 - 14 Day Rental"],
      image: "🗑️",
      link: "/services/40-yard",
    },
  ]

  return (
    <div className="py-12 bg-white">
      <div className="content-container">
        <div className="flex flex-col items-center text-center mb-16">
          <Heading level="h2" className="text-3xl font-bold mb-4 text-grey-90">
            Our Dumpster Rental Services
          </Heading>
          <Text className="text-grey-60 max-w-2xl">
            We offer a variety of dumpster sizes to meet your specific needs. Whether you're cleaning out your garage or managing a large construction project, we have the right solution for you.
          </Text>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div key={service.id} className="flex flex-col border border-ui-border-base rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 bg-grey-10 flex items-center justify-center">
                <span className="text-7xl">{service.image}</span>
              </div>
              <div className="p-8">
                <Heading level="h3" className="text-2xl font-semibold mb-3 text-grey-90">
                  {service.title}
                </Heading>
                <Text className="text-grey-60 mb-6 text-lg">
                  {service.description}
                </Text>
                <ul className="mb-6 space-y-3">
                  {service.details.map((detail, index) => (
                    <li key={index} className="flex items-center text-grey-70 text-lg">
                      <span className="mr-3 text-grey-90">✓</span>
                      {detail}
                    </li>
                  ))}
                </ul>
                <Button variant="secondary" className="w-full text-grey-90 hover:text-grey-80 border-grey-30 hover:border-grey-50 transition-colors py-3 text-lg" asChild>
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
