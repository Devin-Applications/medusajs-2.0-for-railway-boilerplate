import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "../../../../modules/common/components/localized-client-link"
import React from "react"

const Services = () => {
  const services = [
    {
      id: "residential",
      title: "Residential Dumpsters",
      description: "Perfect for home cleanouts, renovations, and yard waste disposal.",
      image: "/images/residential-dumpster.jpg",
      link: "/services/residential",
    },
    {
      id: "commercial",
      title: "Commercial Dumpsters",
      description: "Ideal for businesses, retail locations, and office cleanouts.",
      image: "/images/commercial-dumpster.jpg",
      link: "/services/commercial",
    },
    {
      id: "construction",
      title: "Construction Debris",
      description: "Designed for construction sites and large renovation projects.",
      image: "/images/construction-dumpster.jpg",
      link: "/services/construction",
    },
  ]

  return (
    <div className="py-12 bg-white">
      <div className="content-container">
        <div className="flex flex-col items-center text-center mb-16">
          <Heading level="h2" className="text-3xl font-bold mb-4">
            Our Dumpster Rental Services
          </Heading>
          <Text className="text-ui-fg-subtle max-w-2xl">
            We offer a variety of dumpster sizes to meet your specific needs. Whether you're cleaning out your garage or managing a large construction project, we have the right solution for you.
          </Text>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="flex flex-col border border-ui-border-base rounded-lg overflow-hidden">
              <div className="h-48 bg-ui-bg-subtle flex items-center justify-center">
                <span className="text-2xl">🗑️</span>
              </div>
              <div className="p-6">
                <Heading level="h3" className="text-xl font-semibold mb-2">
                  {service.title}
                </Heading>
                <Text className="text-ui-fg-subtle mb-4">
                  {service.description}
                </Text>
                <LocalizedClientLink
                  href={service.link}
                  className="text-ui-fg-interactive font-medium hover:text-ui-fg-interactive-hover"
                >
                  Learn More →
                </LocalizedClientLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Services
