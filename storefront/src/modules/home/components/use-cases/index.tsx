import { Heading, Text } from "@medusajs/ui"
import React from "react"
import Image from "next/image"

const UseCases = () => {
  const cases = [
    { id: 1, title: "Fire & Water Restoration", icon: "/icons/fire-water.svg" },
    { id: 2, title: "Commercial Construction", icon: "/icons/construction.svg" },
    { id: 3, title: "Demolitions", icon: "/icons/demolition.svg" },
    { id: 4, title: "Moving", icon: "/icons/moving.svg" },
    { id: 5, title: "Basement Purge", icon: "/icons/basement.svg" },
    { id: 6, title: "Roofing Tear off", icon: "/icons/roofing.svg" },
    { id: 7, title: "Remodeling", icon: "/icons/remodeling.svg" },
    { id: 8, title: "Downsizing", icon: "/icons/downsizing.svg" },
    { id: 9, title: "Garage Cleanouts", icon: "/icons/garage.svg" },
    { id: 10, title: "Estate Cleanouts", icon: "/icons/estate.svg" }
  ]

  return (
    <div className="py-16 bg-white">
      <div className="content-container">
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16 px-4">
          <Heading level="h2" className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-5 text-grey-90">
            Our Dumpster Rental Services Are Great For...
          </Heading>
          <Text className="text-grey-60 max-w-2xl text-base sm:text-lg">
            Whatever your project, we have the right dumpster size to handle your waste removal needs.
          </Text>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 px-4 sm:px-0">
          {cases.map((useCase) => (
            <div key={useCase.id} className="flex flex-col items-center p-5 sm:p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all transform hover:scale-[1.05] border border-grey-10">
              <div className="w-16 h-16 mb-4 sm:mb-5 bg-orange-500 rounded-full flex items-center justify-center">
                <Image src={useCase.icon} width={32} height={32} alt={useCase.title} />
              </div>
              <Heading level="h3" className="text-center text-grey-90 text-base sm:text-lg font-medium">
                {useCase.title}
              </Heading>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UseCases
