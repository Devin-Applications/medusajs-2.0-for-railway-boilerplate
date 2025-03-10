import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "../../../../modules/common/components/localized-client-link"
import React from "react"

const Services = () => {
  const services = [
    {
      id: "10-yard",
      title: "10' Dumpster Rental",
      description: "Perfect for small home cleanouts and minor renovation projects.",
      image: "/images/10-yard-dumpster.jpg",
      link: "/services/10-yard",
    },
    {
      id: "15-yard",
      title: "15' Dumpster Rental",
      description: "Ideal for medium-sized residential projects and small commercial needs.",
      image: "/images/15-yard-dumpster.jpg",
      link: "/services/15-yard",
    },
    {
      id: "20-yard",
      title: "20' Dumpster Rental",
      description: "Great for larger home renovations and medium commercial projects.",
      image: "/images/20-yard-dumpster.jpg",
      link: "/services/20-yard",
    },
    {
      id: "30-yard",
      title: "30' Dumpster Rental",
      description: "Suitable for major construction projects and large cleanouts.",
      image: "/images/30-yard-dumpster.jpg",
      link: "/services/30-yard",
    },
    {
      id: "40-yard",
      title: "40' Dumpster Rental",
      description: "Our largest option for major commercial and industrial projects.",
      image: "/images/40-yard-dumpster.jpg",
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="flex flex-col border border-ui-border-base rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 bg-grey-10 flex items-center justify-center">
                <span className="text-4xl">🗑️</span>
              </div>
              <div className="p-6">
                <Heading level="h3" className="text-xl font-semibold mb-2 text-grey-80">
                  {service.title}
                </Heading>
                <Text className="text-ui-fg-subtle mb-4">
                  {service.description}
                </Text>
                <LocalizedClientLink
                  href={service.link}
                  className="text-grey-70 font-medium hover:text-grey-90 transition-colors"
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
