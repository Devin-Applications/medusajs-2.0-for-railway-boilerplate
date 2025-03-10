import { Heading, Text } from "@medusajs/ui"
import React from "react"

const WhyChooseUs = () => {
  const benefits = [
    {
      id: 1,
      title: "HOA-Friendly",
      description: "Our dumpsters are all HOA-friendly and will not damage your driveway. We are a licensed, insured, and family-owned-and-operated business.",
      icon: "🏘️"
    },
    {
      id: 2,
      title: "Affordable Pricing",
      description: "We offer the most competitive pricing around. Call or text now to see our current rates...you will not be disappointed!",
      icon: "💰"
    },
    {
      id: 3,
      title: "Flexible Rental Periods",
      description: "We offer anywhere from 1 day to 14 days standard rental periods. Service available 7 days a week.",
      icon: "📅"
    }
  ]

  return (
    <div className="py-16 bg-grey-5">
      <div className="content-container">
        <div className="flex flex-col items-center text-center mb-8 sm:mb-12 px-4">
          <Heading level="h2" className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-grey-90">
            Why Choose Us?
          </Heading>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 px-4 sm:px-0">
          {benefits.map((benefit) => (
            <div key={benefit.id} className="flex flex-col p-6 sm:p-8 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow min-h-[200px] sm:min-h-[250px]">
              <div className="flex items-center mb-6 sm:mb-8">
                <span className="text-4xl sm:text-5xl mr-4 sm:mr-6 bg-grey-5 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full shadow-sm">{benefit.icon}</span>
                <Heading level="h3" className="text-xl sm:text-2xl font-bold text-grey-90">
                  {benefit.title}
                </Heading>
              </div>
              <Text className="text-grey-60 text-base sm:text-lg leading-relaxed">
                {benefit.description}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WhyChooseUs
