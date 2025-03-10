"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { regions, defaultRegion, RegionConfig } from "../config/regions"

interface RegionContextType {
  selectedRegion: RegionConfig
  setRegionByName: (name: string) => void
  setRegionByZipCode: (zipCode: string) => void
  phoneNumber: string
}

const RegionContext = createContext<RegionContextType | undefined>(undefined)

interface RegionProviderProps {
  children: ReactNode
  onOpenModal: () => void
}

export const RegionProvider = ({ children, onOpenModal }: RegionProviderProps) => {
  const [selectedRegion, setSelectedRegion] = useState<RegionConfig>(defaultRegion)
  const [hasVisited, setHasVisited] = useState(false)

  useEffect(() => {
    // Initialize from localStorage if available
    try {
      const storedRegion = localStorage.getItem("selected-region")
      const storedHasVisited = localStorage.getItem("has-visited")
      
      if (storedRegion) {
        const parsedRegion = JSON.parse(storedRegion)
        // Validate stored region against current config
        if (regions.some(r => r.name === parsedRegion.name)) {
          setSelectedRegion(parsedRegion)
          setHasVisited(true)
        }
      }
      
      if (!storedHasVisited || !storedRegion) {
        onOpenModal() // Show modal for first-time visitors or those without a region
      }
    } catch (error) {
      console.error("Error reading from localStorage:", error)
      onOpenModal() // Show modal if there's any error reading from localStorage
    }
  }, [onOpenModal])

  // Persist region selection
  useEffect(() => {
    try {
      localStorage.setItem("selected-region", JSON.stringify(selectedRegion))
    } catch (error) {
      console.error("Error writing to localStorage:", error)
    }
  }, [selectedRegion])

  const setRegionByName = (name: string) => {
    const region = regions.find((r) => r.name === name)
    if (region) {
      setSelectedRegion(region)
      setHasVisited(true)
      try {
        localStorage.setItem("has-visited", JSON.stringify(true))
      } catch (error) {
        console.error("Error writing to localStorage:", error)
      }
    }
  }

  const setRegionByZipCode = (zipCode: string) => {
    const region = regions.find((r) => r.zipCodes.includes(zipCode))
    if (region) {
      setSelectedRegion(region)
      setHasVisited(true)
      try {
        localStorage.setItem("has-visited", JSON.stringify(true))
      } catch (error) {
        console.error("Error writing to localStorage:", error)
      }
    }
  }

  return (
    <RegionContext.Provider
      value={{
        selectedRegion,
        setRegionByName,
        setRegionByZipCode,
        phoneNumber: selectedRegion.phone
      }}
    >
      {children}
    </RegionContext.Provider>
  )
}

export const useRegion = () => {
  const context = useContext(RegionContext)
  if (context === undefined) {
    throw new Error("useRegion must be used within a RegionProvider")
  }
  return context
}
