import { Heading, Text } from "@medusajs/ui"
import React from "react"

const UseCases = () => {
  const cases = [
    { id: 1, title: "Fire & Water Restoration", icon: "🔥" },
    { id: 2, title: "Commercial Construction", icon: "🏗️" },
    { id: 3, title: "Demolitions", icon: "🧨" },
    { id: 4, title: "Moving", icon: "📦" },
    { id: 5, title: "Basement Purge", icon: "🧹" },
    { id: 6, title: "Roofing Tear off", icon: "🏠" },
    { id: 7, title: "Remodeling", icon: "🔨" },
    { id: 8, title: "Downsizing", icon: "📉" },
    { id: 9, title: "Garage Cleanouts", icon: "🚗" },
    { id: 10, title: "Estate Cleanouts", icon: "🏡" }
  ]

  return (
    <div className="py-16 bg-grey-5">
      <div className="content-container">
        <div className="flex flex-col items-center text-center mb-12">
          <Heading level="h2" className="text-3xl font-bold mb-4 text-grey-90">
            Our Dumpster Rental Services Are Great For...
          </Heading>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {cases.map((useCase) => (
            <div key={useCase.id} className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-lg transition-all transform hover:scale-[1.02]">
              <span className="text-5xl mb-4">{useCase.icon}</span>
              <Heading level="h3" className="text-center text-grey-90 text-lg font-medium">
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
